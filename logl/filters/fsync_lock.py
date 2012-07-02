# Copyright 2012 10gen, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This module tracks requests from the server to lock or unlock its self from writes. 

import string


def criteria(msg):
    """Does the given log line fit the criteria for this filter?
    return an integer code if yes, -1 if not."""
    if string.find(msg, 'conn2') >= 0:
        if (string.find(msg, 'locked') >= 0):
            return 0
        elif (string.find(msg, 'unlock') >= 0):
            return 1
        elif (string.find(msg, 'CMD fsync')):
            return 2
    return -1


def process(msg, date):
    """if the given log line fits the criteria for this filter,
    processes the line and creates a document for it.
    document = {
       "date" : date,
       "type" : "conn2",
       "info" : {
          "state_code" : messagetype
          "state" : state
          "sync_num" : sync_num
          "lock_num" : lock_num
       }
       "oritinal_message" : msg 
    }"""
    message_type = criteria(msg)
    if message_type < 0:
        return None

    doc = {}
    doc["date"] = date
    doc["type"] = "conn2"
    doc["info"] = {}
    doc["info"]["state_code"] = message_type
    doc["original_message"] = msg

    if message_type == 0:
        doc["info"]["state"] = "LOCKED"
    elif message_type == 1:
        doc["info"]["state"] = "UNLOCKED"
    else:
        doc["info"]["state"] = "FSYNC"
        start = string.find(msg, " sync:")
        doc["info"]["sync_num"] = int(msg[start + 6: start + 7])
        start = string.find(msg, "lock:")
        doc["info"]["lock_num"] = int(msg[start + 5: start + 6])
    return doc

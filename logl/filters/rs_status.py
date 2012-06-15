#!/usr/bin/env python
"""This filter processes RS STATUS CHANGE types of log lines."""

import string
import re


def criteria(msg):
    """does the given log line fit the criteria for this filter?
    return an integer code if yes, -1 if no"""
    # state STARTUP1
    if (string.find(msg, '[rsStart] replSet I am') >= 0):
        return 0
    # state PRIMARY
    if (string.find(msg, 'PRIMARY') >= 0):
        return 1
    # state SECONDARY
    if (string.find(msg, 'SECONDARY') >= 0):
        return 2
    # state STARTUP2
    if (string.find(msg, 'STARTUP2') >= 0):
        return 5
    # state ARBITER
    if (string.find(msg, 'ARBITER') >= 0):
        return 7
    # state DOWN
    if (string.find(msg, 'DOWN') >= 0):
        return 8


def process(msg, date):
    """if the given log line fits the critera for this filter,
    processes the line and creates a document for it.
    document = {
       "date" : date,
       "type" : "status",
       "msg" : msg,
       "origin_server" : name,
       "info" : {
          "subtype" : None,
          "state" : state,
          "state_code" : int,
          "server" : "host:port",
          }
    }"""
    result = criteria(msg)
    if result < 0:
        return None
    labels = ["STARTUP1", "PRIMARY", "SECONDARY",
              "RECOVERING", "FATAL", "STARTUP2",
              "UNKNOWN", "ARBITER", "DOWN", "ROLLBACK",
              "REMOVED"]
    doc = {}
    doc["date"] = date
    doc["type"] = "status"
    doc["info"] = {}
    doc["msg"] = msg
    doc["info"]["state_code"] = result
    doc["info"]["state"] = labels[result]

    pattern = re.compile("\S+:[0-9]{1,5}")
    n = pattern.search(msg[20:])
    if n:
        doc["info"]["server"] = n.group(0)
    else:
        # if no server found, assume self is target??
        doc["info"]["server"] = "self"
    return doc

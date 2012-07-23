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

# This file will be used with PyPi in order to package and distribute the final product. 

classifiers = """\
Development Status :: 4 - Beta
Intended Audience :: Developers
License :: OSI Approved :: Apache Software License
Programming Language :: Python
Programming Language :: JavaScript
Topic :: Database
Topic :: Software Development :: Libraries :: Python Modules
Operating System :: Unix
"""

from distutils.core import setup
import sys

if sys.version_info < (2, 3):
    _setup = setup
    def setup(**kwargs):
        if kwargs.has_key("classifiers"):
            del kwargs["classifiers"]
        _setup(**kwargs)
__doc__ = ""
doclines = __doc__.split("\n")

setup(name="logl",
      version="0.3.9",
      maintainer="10Gen",
      maintainer_email="kaushal.parikh@10gen.com",
      #url = "https://github.com/kchodorow/logl",
      license = "http://www.apache.org/licenses/LICENSE-2.0.html",
      platforms = ["any"],
      description = doclines[0],
      classifiers = filter(None, classifiers.split("\n")),
      long_description = "\n".join(doclines[2:]),
      #include_package_data=True,
      packages=['logl', 'logl.filters', 'logl.post', 'logl.ui', 'logl.sample_logs', 'logl.ui.display.js', 'logl.ui.display.style', 'logl.ui.display', 'logl.sample_logs.hp', 'logl.sample_logs.pr'],
      #packages = find_packages('src'),  # include all packages under src
      #package_dir = {'':'src'},   # tell distutils packages are under src
      scripts = ['scripts/logl'],
      install_requires = ['pymongo'],

      package_data = {
          # If any package contains *.txt files, include them:
          'logl.ui.display.js': ['*.js'],
          'logl.ui.display.style': ['*.css'],
          'logl.ui.display': ['*.jpg', '*.html'],
          'logl.sample_logs.hp': ['*.log'],
          'logl.sample_logs.pr': ['*.log'],
          # And include any *.dat files found in the 'data' subdirectory
          # of the 'mypkg' package, also:
      }
      )

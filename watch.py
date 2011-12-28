#!/usr/bin/env python
import asyncore
import pyinotify
import sys
import shlex
import subprocess


class FileHandler(object):

    def handle(self, file):
        split = file.split('.')
        filename = '.'.join(split[:-1])
        ext = split[-1]
        getattr(self, 'handle_%s' % ext)(filename)

    def handle_haml(self, filename):
        sys.stdout.write('%s.haml -> %s.html...' % (filename, filename))
        subprocess.call(
            shlex.split(
                'haml -f html5 %s.haml %s.html' % (filename, filename)))
        sys.stdout.write('Ok\n')

    def handle_sass(self, filename):
        sys.stdout.write('%s.sass -> %s.css...' % (filename, filename))
        subprocess.call(
            shlex.split(
                'sass %s.sass %s.css' % (filename, filename)))
        sys.stdout.write('Ok\n')

    def handle_coffee(self, filename):
        sys.stdout.write('%s.coffee -> %s.js...' % (filename, filename))
        subprocess.call(
            shlex.split(
                'coffee -c %s.coffee' % filename))
        sys.stdout.write('Ok\n')

file_handler = FileHandler()


class EventHandler(pyinotify.ProcessEvent):
    """Handler of inotify events."""
    def process_IN_CLOSE_WRITE(self, event):
        """Function launched when a file is written."""
        file_handler.handle(event.pathname)

watcher = pyinotify.WatchManager()
notifier = pyinotify.AsyncNotifier(watcher, EventHandler())

for file in sys.argv[1:]:
    ext = file.split('.')[-1]
    if not hasattr(FileHandler, 'handle_%s' % ext):
        raise ValueError('Unknown file format %s' % ext)
    watcher.add_watch(file, pyinotify.IN_CLOSE_WRITE)
    file_handler.handle(file)

asyncore.loop()

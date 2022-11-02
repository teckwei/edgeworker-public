/*
(c) Copyright 2020 Akamai Technologies, Inc. Licensed under Apache 2 license.

Version: 0.2
Purpose:  EdgeWorker that generates a simple html page at the Edge and adds a response header
Repo: https://github.com/akamai/edgeworkers-examples/tree/master/hello-world
*/

// Import logging module
import { logger } from 'log';

export function onClientRequest(request) {

    let current_date = new Date().toLocaleString('sv-SE', {hour12: false, timeZone:'Asia/Kuala_Lumpur', timeZoneName: 'short'});

    let lock_date = new Date('2022-11-1 14:00:00').toLocaleString('sv-SE', {hour12: false, timeZone:'UTC', timeZoneName: 'short'});
    let release_date = new Date('2022-11-30 12:00:00').toLocaleString('sv-SE', {hour12: false, timeZone:'UTC', timeZoneName: 'short'});

    logger.log(current_date > lock_date && current_date < release_date, release_date > lock_date, current_date > lock_date, release_date > current_date, current_date, release_date, lock_date)

    if (current_date > lock_date && current_date < release_date) {
        if(release_date > lock_date) {
          request.respondWith(403, {},'<html><body><h1>Not allow to access this material</h1></body></html>')
        }
    }
}

export function onClientResponse (request, response) {
  // Outputs a message to the X-Akamai-EdgeWorker-onClientResponse-Log header.
  logger.log('Adding a header in ClientResponse');

  response.setHeader('X-Hello-World', 'From Akamai EdgeWorkers');
}

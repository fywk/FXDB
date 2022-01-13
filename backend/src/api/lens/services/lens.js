'use strict';

/**
 * lens service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lens.lens');

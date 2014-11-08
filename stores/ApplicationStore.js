'use strict';

var util = require('util'),
    BaseStore = require('dispatchr/utils/BaseStore'),
    EventEmitter = require('events').EventEmitter,
    debug = require('debug')('App:ApplicationStore');

function ApplicationStore(dispatcher) {
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.pages = {
        home: {
            text: 'Home',
            route: 'home'
        },
        workout: {
            text: 'Workout',
            route: 'workout'
        },
        profile: {
            text: 'Profile',
            route: 'profile'
        }
    };
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'CHANGE_ROUTE_START': 'handleNavigate'
};

util.inherits(ApplicationStore, BaseStore);

ApplicationStore.prototype.handleNavigate = function (route) {
    var pageName = route.config.page,
        page = this.pages[pageName];

    if (pageName === this.getCurrentPageName()) {
        return;
    }

    this.currentPageName = pageName;
    this.currentPage = page;
    this.currentRoute = route;
    this.emitChange();
};

ApplicationStore.prototype.getCurrentPageName = function () {
    return this.currentPageName;
};

ApplicationStore.prototype.getState = function () {
    debug('getState');
    return {
        currentPageName: this.currentPageName,
        currentPage: this.currentPage,
        pages: this.pages,
        route: this.currentRoute
    };
};

ApplicationStore.prototype.dehydrate = function () {
    return this.getState();
};

ApplicationStore.prototype.rehydrate = function (state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.currentRoute = state.route;
};

module.exports = ApplicationStore;

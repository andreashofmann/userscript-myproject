// ==UserScript==
// @name myproject fixes
// @namespace http://ahofmann.de
// @include https://myproject.telekom.de/pi/rb/taskboards/*
// @match https://myproject.telekom.de/pi/rb/taskboards/*
// ==/UserScript==

(function () {
    var $ = jQuery;

    MP = {
        run: function () {
            this.initializeModules();
            this.loadSettings();
            this.buildMenu();
        },

        initializeModules: function () {
            var modules = [];

            // Hide closed tasks
            modules.push({
                id: 'hide-closed-tasks',
                filter: 'taskboard',
                menuItem: 'Hide closed tasks',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Hide closed stories
            modules.push({
                id: 'hide-closed-stories',
                filter: 'taskboard',
                menuItem: 'Hide closed stories',
                onActivate: function () {
                    $('body').addClass(this.id);
                    $('.story.closed').each(function () {
                        $(this).parent().parent().addClass('closed');
                    });
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                    $('.story.closed').each(function () {
                        $(this).parent().parent().removeClass('closed');
                    });
                }
            });

            // Hide impediments
            modules.push({
                id: 'hide-impediments',
                filter: 'taskboard',
                menuItem: 'Hide impediments',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });


            // Show "REVIEW ME!" in non-assigned resolved tasks
            modules.push({
                id: 'show-review-reminder',
                filter: 'taskboard',
                menuItem: 'Show review reminder',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });


            // Keep alive, keep alive
            modules.push({
                id: 'keep-alive',
                menuItem: 'Keep session alive',
                onActivate: function () {
                    var xhReq = new XMLHttpRequest();
                    this.interval = setInterval(function () {
                        if (document.hasFocus()) {
                        xhReq.open('GET', 'https://myproject.telekom.de/pi/rb/taskboards/1495?project_id=640', true);
                        xhReq.send(null);
                        } else {
                            window.location.reload();
                        }
                    }, 300000);
                },
                onDeactivate: function () {
                    clearInterval(this.interval);
                }
            });

            // Team bobble story colors
            modules.push({
                id: 'team-bobbel-colors',
                filter: 'taskboard',
                menuItem: 'Bobbel colors',
                onActivate: function () {
                    MP.helper.addStoryClasses();
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Hide stories tagged for Team Left Bobbel
            modules.push({
                id: 'hide-left-bobbel',
                filter: 'taskboard',
                dependencies: ['team-bobbel-colors'],
                menuItem: 'Hide left bobbel stories',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Hide stories tagged for Team Right Bobbel
            modules.push({
                id: 'hide-right-bobbel',
                filter: 'taskboard',
                menuItem: 'Hide right bobbel stories',
                onActivate: function () {
                    MP.helper.addStoryClasses();
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Hide stories tagged for Team Middle Bobbel
            modules.push({
                id: 'hide-middle-bobbel',
                filter: 'taskboard',
                menuItem: 'Hide middle bobbel stories',
                onActivate: function () {
                    MP.helper.addStoryClasses();
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Hide stories not tagged for any team
            modules.push({
                id: 'hide-no-bobbel',
                filter: 'taskboard',
                menuItem: 'Hide non-bobbel stories',
                onActivate: function () {
                    MP.helper.addStoryClasses();
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });


            // Expand table to 100%
            /*modules.push({
                id: 'wide-table',
                menuItem: 'Set table to 100% width',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });*/

            // Restrict 'Story' column
            modules.push({
                id: 'narrow-story',
                filter: 'taskboard',
                menuItem: 'Restrict "Story" width',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Restrict 'On Hold' column
            modules.push({
                id: 'narrow-on-hold',
                filter: 'taskboard',
                menuItem: 'Restrict "On Hold" width',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Restrict 'Rejected' column
            modules.push({
                id: 'narrow-rejected',
                filter: 'taskboard',
                menuItem: 'Restrict "Rejected" width',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Restrict 'Closed' column
            modules.push({
                id: 'narrow-closed',
                filter: 'taskboard',
                menuItem: 'Restrict "Closed" width',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Readable issues
            modules.push({
                id: 'readable-issues',
                filter: 'taskboard',
                menuItem: 'Make issues readable',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Sliding header by Thomas Rosenau
            modules.push({
                id: 'clone-header',
                filter: 'taskboard',
                menuItem: 'Keep header visible',
                header: $('#board_header'),
                onActivate: function () {
                    if (!this.clone) {
                        this.clone = $(this.header.clone(true));
                        this.clone.insertAfter(this.header);
                    }
                    this.clone.addClass(this.id);
                    this.setPosAndDisplay();
                    $(window).on('scroll', this.setPosAndDisplay.bind(this));
                },
                setPosAndDisplay: function () {
                    var offset = $(this.header).offset();
                    $(this.clone).css({
                        left: offset.left - window.scrollX,
                        display: window.scrollY < offset.top ? 'none' : 'table'
                    });
                },
                onDeactivate: function () {
                    this.clone.addClass('disabled');
                }
            });

            // Auto-assign
            modules.push({
                id: 'auto-assign',
                filter: 'taskboard',
                menuItem: '(Un-)Assign automatically',
                onActivate: function () {
                    RB.Task.origSaveDirectives = RB.Task.saveDirectives;
                    RB.Task.saveDirectives = function () {
                        var column = this.$.parent('td').first().attr('id').split("_")[1],
                            unassignColumns = ['14'/*new*/, '3'/*resolved*/, '6'/*rejected*/],
                            assignColumns = ['2'/*progress*/],
                            result = this.origSaveDirectives();

                        if (result.data.indexOf('assigned_to_id') === -1) {
                            if (assignColumns.indexOf(column) !== -1) {
                                result.data += '&assigned_to_id=' + MP.helper.getUserId();
                                this.$.css('background-color', MP.helper.getUserColor());
                            } else if (unassignColumns.indexOf(column) !== -1) {
                                result.data += '&assigned_to_id=';
                                this.$.css('background-color', '');
                            }
                        }

                        return result;
                    }
                },
                onDeactivate: function () {
                    RB.Task.saveDirectives = RB.Task.origSaveDirectives;
                }
            });

            modules.push({
                id: 'taskboard-shortcuts',
                menuItem: 'Taskboard shortcuts',
                onActivate: function () {
                    var sidebar = $('#menu-sidebar'),
                        currentTaskboardLink = $('<a>Current Sprint</a>'),
                        previousTaskboardLink = $('<a>Previous Sprint</a>'),
                        quickLinkBox = $('<div class="sb-quicklinks"><h2>Task Boards</h2></div>');

                    currentTaskboardLink.prop('href', MP.helper.getCurrentSprintTaskboard());
                    currentTaskboardLink.appendTo(quickLinkBox);
                    previousTaskboardLink.prop('href', MP.helper.getPreviousSprintTaskboard());
                    previousTaskboardLink.appendTo(quickLinkBox);
                    quickLinkBox.prependTo(sidebar);

                    if (location.href === MP.helper.getCurrentSprintTaskboard()) {
                        currentTaskboardLink.addClass('selected');
                        $('.backlogs').removeClass('selected');
                    }

                    if (location.href === MP.helper.getPreviousSprintTaskboard()) {
                        previousTaskboardLink.addClass('selected');
                        $('.backlogs').removeClass('selected');
                    }
                },
                onDeactivate: function () {
                    $('.sb-quicklinks').remove();
                }
            });

            modules.push({
                id: 'task-contextmenu',
                menuItem: 'Context menu for task',
                onActivate: function () {
                    jQuery('.task').contextPopup({
                        items: [{
                            label: 'Assign to me',
                            action: function (event) {
                                var target = $(event.target),
                                    task;

                                if (!target.hasClass('task')) {
                                    target = target.parent('.task');
                                }
                                task = target.data('this');
                                task.tempSaveDirectives = task.saveDirectives;
                                task.saveDirectives = function () {
                                    var directives = this.tempSaveDirectives();
                                    directives.data.replace(/&assigned_to_id=[0-9]*/g, '');
                                    directives.data += '&assigned_to_id=' + MP.helper.getUserId();
                                    this.$.css('background-color', MP.helper.getUserColor());
                                    return directives;
                                };
                                task.saveEdits();
                                task.saveDirectives = task.tempSaveDirectives;
                                delete task.tempSaveDirectives;
                            }
                        }, {
                            label: 'Unassign',
                            action: function (event) {
                                var target = $(event.target),
                                    task;

                                if (!target.hasClass('task')) {
                                    target = target.parent('.task');
                                }
                                task = target.data('this');
                                task.tempSaveDirectives = task.saveDirectives;
                                task.saveDirectives = function () {
                                    var directives = this.tempSaveDirectives();
                                    directives.data.replace(/&assigned_to_id=[0-9]*/g, '');
                                    directives.data += '&assigned_to_id=';
                                    this.$.css('background-color', '');
                                    return directives;
                                };
                                task.saveEdits();
                                task.saveDirectives = task.tempSaveDirectives;
                                delete task.tempSaveDirectives;
                            }
                        }, {
                            label: 'Commit message',
                            action: function (event) {
                                var target = $(event.target),
                                    issue,
                                    subject,
                                    message;

                                if (!target.hasClass('task')) {
                                    target = target.parent('.task');
                                }


                                issue = target.find('.id a').text();
                                subject = target.find('.subject').text();
                                message = 'Since I\'m not in the mood for Flash hacks, you\'ll have to copy that yourself. Sorry.';

                                window.prompt(message, issue + ': ' + subject);

                            }
                        }]
                    });
                }
            });

            this.modules = modules;
        },

        loadSettings: function () {
            var settings = {};

            $.each(this.modules, function (index, module) {
                settings[module.id] = false;
            });

            savedSettings = this.helper.getCookie('sb_settings');

            savedSettings = savedSettings && JSON.parse(savedSettings);

            if (savedSettings) {
                $.extend(settings, savedSettings);
            };

            this.settings = settings;

            $.each(this.modules, function (index, module) {
                if (settings[module.id]) {
                    if (!module.filter || location.href.indexOf(module.filter) !== -1) {
                        module.onActivate();
                    }

                };
            });
        },

        saveSettings: function () {
            this.helper.setCookie('sb_settings', JSON.stringify(this.settings), 356);
        },

        buildMenu: function () {
            var sidebar = $('#main-menu'),
                options = $('<div class="sb-settings-menu"></div>');

            $.each(this.modules, (function (index, module) {
                var setting = module.id,
                    checkbox = $('<input type=checkbox id=' + setting + '><label for=' + setting + '>' + module.menuItem + '</label><br>');

                checkbox.prop('checked', this.settings[setting]);
                checkbox.click((function () {
                    var checked = checkbox.prop('checked');
                    if (!module.filter || location.href.indexOf(module.filter) !== -1) {
                        $('body')[checked ? 'addClass' : 'removeClass'](setting);
                        module[checked ? 'onActivate' : 'onDeactivate']();
                    }
                    this.settings[setting] = checked;
                    this.saveSettings();
                }).bind(this));
                checkbox.appendTo(options);
            }).bind(this));
            options.appendTo(sidebar);
        },

        helper: {
            setCookie: function (name, value, expiredays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
                document.cookie = name + '=' + escape(value) + ((expiredays === null) ? '' : ';path=/;expires=' + exdate.toGMTString());
            },
            getCookie: function (name) {
                var c_start, c_end;
                if (document.cookie.length > 0) {
                    c_start = document.cookie.indexOf(name + '=');
                    if (c_start !== -1) {
                        c_start = c_start + name.length + 1;
                        c_end = document.cookie.indexOf(';', c_start);
                        if (c_end === -1) {
                            c_end = document.cookie.length;
                        }
                        return unescape(document.cookie.substring(c_start, c_end));
                    }
                }
                return '';
            },
            addStoryClasses: function () {
                if (!this.addedStoryClasses) {
                    this.addedStoryClasses = true;
                    $('.story').each(function () {
                        if (/#tlb/.test($(this).find('.subject').text())) {
                            $(this).parent().parent().addClass('team-left-bobbel');
                        } else if (/#trb/.test($(this).find('.subject').text())) {
                            $(this).parent().parent().addClass('team-right-bobbel');
                        } else if (/#tmb/.test($(this).find('.subject').text())) {
                            $(this).parent().parent().addClass('team-middle-bobbel');
                        }
                    });
                }
            },
            getUserId: function () {
                this.userId = this.userId || $('[href*="/pi/users"]').attr('href').split('/')[3];
                return this.userId;
            },
            getUserColor: function () {
                this.userColor = this.userColor || $('.template [value="' + this.getUserId() + '"]').attr('color');
                return this.userColor;
            },
            getCurrentSprintTaskboard: function () {
                return 'https://myproject.telekom.de/pi/rb/taskboards/1569?project_id=640';
            },
            getPreviousSprintTaskboard: function () {
                return 'https://myproject.telekom.de/pi/rb/taskboards/1567?project_id=640';
            }
        }

    };

    /**
 * jQuery plugin for Pretty looking right click context menu.
 *
 * Requires popup.js and popup.css to be included in your page. And jQuery, obviously.
 *
 * Usage:
 *
 *   $('.something').contextPopup({
 *     title: 'Some title',
 *     items: [
 *       {label:'My Item', icon:'/some/icon1.png', action:function() { alert('hi'); }},
 *       {label:'Item #2', icon:'/some/icon2.png', action:function() { alert('yo'); }},
 *       null, // divider
 *       {label:'Blahhhh', icon:'/some/icon3.png', action:function() { alert('bye'); }},
 *     ]
 *   });
 *
 * Icon needs to be 16x16. I recommend the Fugue icon set from: http://p.yusukekamiyamane.com/
 *
 * - Joe Walnes, 2011 http://joewalnes.com/
 *   https://github.com/joewalnes/jquery-simple-context-menu
 *
 * MIT License: https://github.com/joewalnes/jquery-simple-context-menu/blob/master/LICENSE.txt
 */
    jQuery.fn.contextPopup = function(menuData) {
        // Define default settings
        var settings = {
            contextMenuClass: 'contextMenuPlugin',
            gutterLineClass: 'gutterLine',
            headerClass: 'header',
            seperatorClass: 'divider',
            title: '',
            items: []
        };

        // merge them
        $.extend(settings, menuData);

        // Build popup menu HTML
        function createMenu(e) {
            var menu = $('<ul class="' + settings.contextMenuClass + '"><div class="' + settings.gutterLineClass + '"></div></ul>')
            .appendTo(document.body);
            if (settings.title) {
                $('<li class="' + settings.headerClass + '"></li>').text(settings.title).appendTo(menu);
            }
            settings.items.forEach(function(item) {
                if (item) {
                    var rowCode = '<li><a href="#"><span></span></a></li>';
                    // if(item.icon)
                    //   rowCode += '<img>';
                    // rowCode +=  '<span></span></a></li>';
                    var row = $(rowCode).appendTo(menu);
                    if(item.icon){
                        var icon = $('<img>');
                        icon.attr('src', item.icon);
                        icon.insertBefore(row.find('span'));
                    }
                    row.find('span').text(item.label);
                    if (item.action) {
                        row.find('a').click(function(){ item.action(e); });
                    }
                } else {
                    $('<li class="' + settings.seperatorClass + '"></li>').appendTo(menu);
                }
            });
            menu.find('.' + settings.headerClass ).text(settings.title);
            return menu;
        }

        // On contextmenu event (right click)
        this.bind('contextmenu', function(e) {
            var menu = createMenu(e)
            .show();

            var left = e.pageX + 5, /* nudge to the right, so the pointer is covering the title */
            top = e.pageY;
            if (top + menu.height() >= $(window).height()) {
                top -= menu.height();
            }
            if (left + menu.width() >= $(window).width()) {
                left -= menu.width();
            }

            // Create and show menu
            menu.css({zIndex:1000001, left:left, top:top})
            .bind('contextmenu', function() { return false; });

            // Cover rest of page with invisible div that when clicked will cancel the popup.
            var bg = $('<div></div>')
            .css({left:0, top:0, width:'100%', height:'100%', position:'absolute', zIndex:1000000})
            .appendTo(document.body)
            .bind('contextmenu click', function() {
                // If click or right click anywhere else on page: remove clean up.
                bg.remove();
                menu.remove();
                return false;
            });

            // When clicking on a link in menu: clean up (in addition to handlers on link already)
            menu.find('a').click(function() {
                bg.remove();
                menu.remove();
            });

            // Cancel event, so real browser popup doesn't appear.
            return false;
        });

        return this;
    };

    MP.run();
})();

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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'general',
                menuItem: 'Keep session alive',
                onActivate: function () {
                    var xhReq = new XMLHttpRequest();
                    this.interval = setInterval(function () {
                        xhReq.open('GET', 'https://myproject.telekom.de/pi/rb/taskboards/1495?project_id=640', true);
                        xhReq.send(null);
                    }, 900000);
                },
                onDeactivate: function () {
                    clearInterval(this.interval);
                }
            });

            // Team bobble story colors
            modules.push({
                id: 'team-bobbel-colors',
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                category: 'taskboard',
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
                    module.onActivate();
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
                    $('body')[checked ? 'addClass' : 'removeClass'](setting);
                    module[checked ? 'onActivate' : 'onDeactivate']();
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

    MP.run();
})();

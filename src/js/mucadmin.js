/*

Jappix - An open social platform
These are the mucadmin JS scripts for Jappix

-------------------------------------------------

License: AGPL
Authors: Valérian Saliou, Maranda

*/

// Bundle
var MUCAdmin = (function () {

    /**
     * Alias of this
     * @private
     */
    var self = {};


	/**
     * Opens the MUC admin popup
     * @public
     * @param {string} xid
     * @param {string} aff
     * @return {undefined}
     */
    self.openMucAdmin = function(xid, aff) {

        try {
            // Popup HTML content
            var html_full = 
            '<div class="top">' + _e("MUC administration") + '</div>' + 
            
            '<div class="content">' + 
                '<div class="head mucadmin-head">' + 
                    '<div class="head-text mucadmin-head-text">' + _e("You administrate this room") + '</div>' + 
                    
                    '<div class="mucadmin-head-jid">' + xid + '</div>' + 
                '</div>' + 
                
                '<div class="mucadmin-forms">' + 
                    '<div class="mucadmin-topic">' + 
                        '<fieldset>' + 
                            '<legend>' + _e("Subject") + '</legend>' + 
                            
                            '<label for="topic-text">' + _e("Enter new subject") + '</label>' + 
                            '<textarea id="topic-text" name="room-topic" rows="8" cols="60" ></textarea>' + 
                        '</fieldset>' + 
                    '</div>' + 
                    
                    '<div class="mucadmin-conf">' + 
                        '<fieldset>' + 
                            '<legend>' + _e("Configuration") + '</legend>' + 
                            
                            '<div class="results mucadmin-results"></div>' + 
                        '</fieldset>' + 
                    '</div>' + 
                    
                    '<div class="mucadmin-aut">' + 
                        '<fieldset>' + 
                            '<legend>' + _e("Authorizations") + '</legend>' + 
                            
                            '<label>' + _e("Member list") + '</label>' + 
                            '<div class="aut-member aut-group">' + 
                                '<a href="#" class="aut-add" onclick="return addInputMucAdmin(\'\', \'member\');">' + _e("Add an input") + '</a>' + 
                            '</div>' + 
                            
                            '<label>' + _e("Owner list") + '</label>' + 
                            '<div class="aut-owner aut-group">' + 
                                '<a href="#" class="aut-add" onclick="return addInputMucAdmin(\'\', \'owner\');">' + _e("Add an input") + '</a>' + 
                            '</div>' + 
                            
                            '<label>' + _e("Administrator list") + '</label>' + 
                            '<div class="aut-admin aut-group">' + 
                                '<a href="#" class="aut-add" onclick="return addInputMucAdmin(\'\', \'admin\');">' + _e("Add an input") + '</a>' + 
                            '</div>' + 
                            
                            '<label>' + _e("Outcast list") + '</label>' + 
                            '<div class="aut-outcast aut-group">' + 
                                '<a href="#" class="aut-add" onclick="return addInputMucAdmin(\'\', \'outcast\');">' + _e("Add an input") + '</a>' + 
                            '</div>' + 
                        '</fieldset>' + 
                    '</div>' + 
                    
                    '<div class="mucadmin-others">' + 
                        '<fieldset>' + 
                            '<legend>' + _e("Others") + '</legend>' + 
                            
                            '<label>' + _e("Destroy this MUC") + '</label>' + 
                            '<a href="#" onclick="return destroyMucAdmin();">' + _e("Yes, let's do it!") + '</a>' + 
                        '</fieldset>' + 
                    '</div>' + 
                '</div>' + 
            '</div>' + 
            
            '<div class="bottom">' + 
                '<div class="wait wait-medium"></div>' + 
                
                '<a href="#" class="finish save">' + _e("Save") + '</a>' + 
                '<a href="#" class="finish cancel">' + _e("Cancel") + '</a>' + 
            '</div>';
            
            var html_partial = 
            '<div class="top">' + _e("MUC administration") + '</div>' + 
            
            '<div class="content">' + 
                '<div class="head mucadmin-head">' + 
                    '<div class="head-text mucadmin-head-text">' + _e("You administrate this room") + '</div>' + 
                    
                    '<div class="mucadmin-head-jid">' + xid + '</div>' + 
                '</div>' + 
                
                '<div class="mucadmin-forms">' + 
                    '<div class="mucadmin-aut">' + 
                        '<fieldset>' + 
                            '<legend>' + _e("Authorizations") + '</legend>' + 
                            
                            '<label>' + _e("Member list") + '</label>' + 
                            '<div class="aut-member aut-group">' + 
                                '<a href="#" class="aut-add" onclick="return addInputMucAdmin(\'\', \'member\');">' + _e("Add an input") + '</a>' + 
                            '</div>' + 
                            
                            '<label>' + _e("Outcast list") + '</label>' + 
                            '<div class="aut-outcast aut-group">' + 
                                '<a href="#" class="aut-add" onclick="return addInputMucAdmin(\'\', \'outcast\');">' + _e("Add an input") + '</a>' + 
                            '</div>' + 
                        '</fieldset>' + 
                    '</div>' + 
                '</div>' + 
            '</div>' + 
            
            '<div class="bottom">' + 
                '<div class="wait wait-medium"></div>' + 
                
                '<a href="#" class="finish save">' + _e("Save") + '</a>' + 
                '<a href="#" class="finish cancel">' + _e("Cancel") + '</a>' + 
            '</div>';   
            
            // Create the popup
            if(aff == 'owner')
                createPopup('mucadmin', html_full);
            if(aff == 'admin')
                createPopup('mucadmin', html_partial);
            
            // Associate the events
            launchMucAdmin();
                
            // We get the affiliated user's privileges
            if(aff == 'owner') {
                queryMucAdmin(xid, 'member');
                queryMucAdmin(xid, 'owner');
                queryMucAdmin(xid, 'admin');
                queryMucAdmin(xid, 'outcast');
                // We query the room to edit
                dataForm(xid, 'muc', '', '', 'mucadmin');
            } else if(aff == 'admin') {
                queryMucAdmin(xid, 'member');
                queryMucAdmin(xid, 'outcast');
            }
        } catch(e) {
            Console.error('MUCAdmin.open', e);
        }

    };


    /**
     * Closes the MUC admin popup
     * @public
     * @return {boolean}
     */
    self.closeMucAdmin = function() {

        try {
            // Destroy the popup
            destroyPopup('mucadmin');
        } catch(e) {
            Console.error('MUCAdmin.close', e);
        } finally {
            return false;
        }

    };


    /**
     * Removes a MUC admin input
     * @public
     * @param {string} element
     * @return {boolean}
     */
    self.removeInputMucAdmin = function(element) {

        try {
            var path = $(element).parent();
            
            // We first hide the container of the input
            path.hide();
            
            // Then, we add a special class to the input
            path.find('input').addClass('aut-dustbin');
        } catch(e) {
            Console.error('MUCAdmin.removeInputMucAdmin', e);
        } finally {
            return false;
        }

    };


    /**
     * Adds a MUC admin input
     * @public
     * @param {type} xid
     * @param {type} affiliation
     * @return {boolean}
     */
    self.addInputMucAdmin = function(xid, affiliation) {

        try {
            var hash = hex_md5(xid + affiliation);
    
            // Add the HTML code
            $('#mucadmin .aut-' + affiliation + ' .aut-add').after(
                '<div class="one-aut ' + hash + '">' + 
                    '<input id="aut-' + affiliation + '" name="' + affiliation + '" type="text" class="mucadmin-i" value="' + xid + '" />' + 
                    '<a href="#" class="aut-remove">[-]</a>' + 
                '</div>'
            );
            
            // Click event
            $('#mucadmin .' + hash + ' .aut-remove').click(function() {
                return removeInputMucAdmin(this);
            });
            
            // Focus on the input we added
            if(!xid) {
                $(document).oneTime(10, function() {
                    $('#mucadmin .' + hash + ' input').focus();
                });
            }
        } catch(e) {
            Console.error('MUCAdmin.addInput', e);
        } finally {
            return false;
        }

    };


    /**
     * Handles the MUC admin form
     * @public
     * @param {type} name
     * @return {undefined}
     */
    self.handleMucAdminAuth = function() {

        try {
            // CODE
        } catch(e) {
            Console.error('MUCAdmin.handleAuth', e);
        }

    };


	/**
     * XXXXXX
     * @public
     * @param {object} iq
     * @return {undefined}
     */
    self.xxxx = function(iq) {

        try {
            // We got the authorizations results
            $(iq.getQuery()).find('item').each(function() {
                // We parse the received xml
                var xid = $(this).attr('jid');
                var affiliation = $(this).attr('affiliation');
                
                // We create one input for one XID
                addInputMucAdmin(xid, affiliation);
            });
            
            // Hide the wait icon
            $('#mucadmin .wait').hide();
            
            Console.log('MUC admin items received: ' + fullXID(getStanzaFrom(iq)));
        } catch(e) {
            Console.error('MUCAdmin.xxxx', e);
        }

    };


    /**
     * Queries the MUC admin form
     * @public
     * @param {string} xid
     * @param {string} type
     * @return {undefined}
     */
    self.queryMucAdmin = function(xid, type) {

        try {
            // Show the wait icon
            $('#mucadmin .wait').show();
            
            // New IQ
            var iq = new JSJaCIQ();
            
            iq.setTo(xid);
            iq.setType('get');
            
            var iqQuery = iq.setQuery(NS_MUC_ADMIN);
            iqQuery.appendChild(iq.buildNode('item', {'affiliation': type, 'xmlns': NS_MUC_ADMIN}));
            
            con.send(iq, handleMucAdminAuth);
        } catch(e) {
            Console.error('MUCAdmin.query', e);
        }

    };


    /**
     * Sends the new chat-room topic
     * @public
     * @param {string} xid
     * @return {undefined}
     */
    self.sendMucAdminTopic = function(xid) {

        try {
            // We get the new topic
            var topic = $('.mucadmin-topic textarea').val();
            
            // We send the new topic if not blank
            if(topic) {
                var m = new JSJaCMessage();
                m.setTo(xid);
                m.setType('groupchat');
                m.setSubject(topic);
                con.send(m);
                
                Console.info('MUC admin topic sent: ' + topic);
            }
        } catch(e) {
            Console.error('MUCAdmin.sendTopic', e);
        }

    };


    /**
     * Sends the MUC admin auth form
     * @public
     * @param {string} xid
     * @return {undefined}
     */
    self.sendMucAdminAuth = function(xid) {

        try {
            // We define the values array
            var types = new Array('member', 'owner', 'admin', 'outcast');

            for(i in types) {
                // We get the current type
                var tType = types[i];
                
                // We loop for all the elements
                $('.mucadmin-aut .aut-' + tType + ' input').each(function() {
                    // We set the iq headers
                    var iq = new JSJaCIQ();
                    iq.setTo(xid);
                    iq.setType('set');

                    var iqQuery = iq.setQuery(NS_MUC_ADMIN);
            
                    // We get the needed values
                    var value = $(this).val();
                    
                    // If there's a value
                    if(value)
                        var item = iqQuery.appendChild(iq.buildNode('item', {'jid': value, 'xmlns': NS_MUC_ADMIN}));
                    
                    // It the user had removed the XID
                    if($(this).hasClass('aut-dustbin') && value)
                        item.setAttribute('affiliation', 'none');
                    
                    // If the value is not blank and okay
                    else if(value)
                        item.setAttribute('affiliation', tType);
            
                    // We send the iq !
                    con.send(iq, handleErrorReply);
                });
            }   
            
            Console.info('MUC admin authorizations form sent: ' + xid);
        } catch(e) {
            Console.error('MUCAdmin.sendAuth', e);
        }

    };


    /**
     * Checks if the MUC room was destroyed
     * @public
     * @param {object} iq
     * @return {undefined}
     */
    self.handleDestroyMucAdminIQ = function(iq) {

        try {
            if(!handleErrorReply(iq)) {
                // We close the groupchat
                var room = fullXID(getStanzaFrom(iq));
                var hash = hex_md5(room);
                quitThisChat(room, hash, 'groupchat');
                
                // We close the muc admin popup
                closeMucAdmin();
                
                // We tell the user that all is okay
                openThisInfo(5);
                
                // We remove the user's favorite
                if(existDB('favorites', room))
                    removeThisFavorite(room, explodeThis('@', room, 0));
                
                Console.info('MUC admin destroyed: ' + room);
            }
            
            // We hide the wait icon
            $('#mucadmin .wait').hide();
        } catch(e) {
            Console.error('MUCAdmin.handleDestroyIQ', e);
        }

    };


	/**
     * Destroys a MUC room
     * @public
     * @param {string} xid
     * @return {boolean}
     */
    self.destroyMucAdminIQ = function(xid) {

        try {
            // We ask the server to delete the room
            var iq = new JSJaCIQ();
            
            iq.setTo(xid);
            iq.setType('set');
            var iqQuery = iq.setQuery(NS_MUC_OWNER);
            iqQuery.appendChild(iq.buildNode('destroy', {'xmlns': NS_MUC_OWNER}));
            
            con.send(iq, handleDestroyMucAdminIQ);
            
            Console.info('MUC admin destroy sent: ' + xid);
        } catch(e) {
            Console.error('MUCAdmin.destroyIQ', e);
        } finally {
            return false;
        }

    };


    /**
     * Performs the MUC room destroy functions
     * @public
     * @return {undefined}
     */
    self.destroyMucAdmin = function() {

        try {
            // We get the XID of the current room
            var xid = $('#mucadmin .mucadmin-head-jid').text();
            
            // We show the wait icon
            $('#mucadmin .wait').show();
            
            // We send the iq
            destroyMucAdminIQ(xid);
        } catch(e) {
            Console.error('MUCAdmin.destroy', e);
        }

    };


    /**
     * Sends all the MUC admin stuffs
     * @public
     * @return {undefined}
     */
    self.sendMucAdmin = function() {

        try {
            // We get the XID of the current room
            var xid = $('#mucadmin .mucadmin-head-jid').text();
            
            // We change the room topic
            sendMucAdminTopic(xid);
            
            // We send the needed queries
            sendDataForm('x', 'submit', 'submit', $('#mucadmin .mucadmin-results').attr('data-session'), xid, '', '', 'mucadmin');
            sendMucAdminAuth(xid);
        } catch(e) {
            Console.error('MUCAdmin.send', e);
        }

    };


    /**
     * Saves the MUC admin elements
     * @public
     * @return {boolean}
     */
    self.saveMucAdmin = function() {

        try {
            // We send the new options
            sendMucAdmin();
            
            // And we quit the popup
            return closeMucAdmin();
        } catch(e) {
            Console.error('MUCAdmin.save', e);
        }

    };


    /**
     * Plugin launcher
     * @public
     * @return {undefined}
     */
    self.launchMucAdmin = function() {

        try {
            // Click events
            $('#mucadmin .bottom .finish').click(function() {
                if($(this).is('.cancel'))
                    return closeMucAdmin();
                if($(this).is('.save'))
                    return saveMucAdmin();
            });
        } catch(e) {
            Console.error('MUCAdmin.launch', e);
        }

    };


    /**
     * Return class scope
     */
    return self;

})();
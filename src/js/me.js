/*

Jappix - An open social platform
These are the Jappix Me tool functions for Jappix

-------------------------------------------------

License: AGPL
Author: Valérian Saliou

*/

// Bundle
var Me = (function () {

    /**
     * Alias of this
     * @private
     */
    var self = {};
    

	/**
     * Opens the Me tools
     * @public
     * @return {undefined}
     */
    self.openMe = function() {

        try {
            // Popup HTML content
            var html = 
            '<div class="top">' + _e("Public profile") + '</div>' + 
            
            '<div class="content">' + 
                '<a class="me-images logo" href="https://me.jappix.com/" target="_blank"></a>' + 
                
                '<div class="infos">' + 
                    '<p class="infos-title">' + _e("Your profile anywhere on the Web.") + '</p>' + 
                    '<p>' + printf(_e("%s is a Jappix.com service which makes your XMPP profile public. It is easier to share it. No XMPP account is required to view your social channel, your current position and your contact details."), '<a href="https://me.jappix.com/" target="_blank">Jappix Me</a>') + '</p>' + 
                    '<p>' + _e("Furthermore, every picture you post in your social channel is added to a beautiful picture timeline. You can now view the pictures you shared year by year.") + '</p>' + 
                    '<p>' + _e("You can also use your XMPP avatar as a single avatar for every website, blog and forum you use. When you change it on XMPP, the new avatar appears everywhere. What a genius improvement!") + '</p>' + 
                '</div>' + 
                
                '<a class="go one-button" href="https://me.jappix.com/new" target="_blank">' + _e("Yay, let's create your public profile!") + '</a>' + 
            '</div>' + 
            
            '<div class="bottom">' + 
                '<a href="#" class="finish">' + _e("Close") + '</a>' + 
            '</div>';
            
            // Create the popup
            createPopup('me', html);
            
            // Associate the events
            launchMe();
            
            Console.log('Public profile tool opened.');
        } catch(e) {
            Console.error('Me.open', e);
        }

    };


    /**
     * Closes the Me tools
     * @public
     * @return {boolean}
     */
    self.closeMe = function() {

        try {
            // Destroy the popup
            destroyPopup('me');
            
            // We finished
            END_WELCOME = false;
        } catch(e) {
            Console.error('Me.close', e);
        } finally {
            return false;
        }

    };


    /**
     * Plugin launcher
     * @public
     * @return {undefined}
     */
    self.launchMe = function() {

        try {
            // Click events
            $('#me .content a.go').click(function() {
                closeMe();
            });
            
            $('#me .bottom .finish').click(closeMe);
        } catch(e) {
            Console.error('Me.launch', e);
        }

    };


    /**
     * Return class scope
     */
    return self;

})();
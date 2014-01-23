M.wrap('github/jillix/layout/v0.0.1/layout.js', function (require, module, exports) {

var Bind = require('github/jillix/bind/v0.0.1/bind');

// custom code
M.custom = {
    bind: {
        addCount: function (data) {
            this.count = this.count || 0;
            data.custom = ++this.count;
            return data;
        },
        resetCount: function (html) {
            this.count = 0;
        }
    }
};

function stateHandler (config) {
    var bind = this.bind;
    
    if (bind.view) {
        
        if (config.data) {
            bind.view.render(config.data);
        }
        
        // set css
        if (config.css) {
            for (var selector in config.css) {
                var elm = bind.view.dom.querySelector(selector);
                if (elm) {
                    for (var style in config.css[selector]) {
                        elm.style[style] = config.css[selector][style];
                    }
                }
            }
        }
    }
}

function init () {
    var self = this;
    self.stateHandler = stateHandler;
    
    config = self.mono.config.data;
    
    // set document title
    if (config.title) {
        document.title = config.title;
    }
    
    // init bind
    Bind(self).load(config.bind, function (err, bind) {
        
        if (err) {
            // TODO do something on error
            return;
        }
        
        // save bind instance
        self.bind = bind;
        
        // set an empty state is the same like: state.set(location.pathname);
        bind.state.set();
        self.emit('ready');
    });
}

module.exports = init;

return module;

});

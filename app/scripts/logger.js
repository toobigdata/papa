(function(window, document){
    function createHttpRequest()
    {
        if(window.ActiveXObject){
            return new ActiveXObject('Microsoft.XMLHTTP');  
        }
        else if(window.XMLHttpRequest){
            return new XMLHttpRequest();  
        }  
    }
    function AliLogTracker(host,project,logstore)
    {
        this.uri_ = 'http://' + project + '.' + host + '/logstores/' + logstore + '/track?APIVersion=0.6.0';
        this.params_=new Array();
        this.httpRequest_ = createHttpRequest();
    }
    AliLogTracker.prototype = {
        push: function(key,value) {
            if(!key || !value) {
                return;
            }
            this.params_.push(key);
            this.params_.push(value);
        },
        logger: function()
        {
            var url = this.uri_;
            var k = 0;
            while(this.params_.length > 0)
            {
                if(k % 2 == 0)
                {
                    url += '&' + encodeURIComponent(this.params_.shift());
                }
                else
                {
                    url += '=' + encodeURIComponent(this.params_.shift());
                }
                ++k;
            }
            try
            {
                this.httpRequest_.open('GET',url,true);
                this.httpRequest_.send(null);
            }
            catch (ex) 
            {
                if (window && window.console && typeof window.console.log === 'function') 
                {
                    console.log('Failed to log to ali log service because of this exception:\n' + ex);
                    console.log('Failed log data:', url);
                }
            }
            
        }
    };
    window.Tracker = AliLogTracker;
})(window, document);

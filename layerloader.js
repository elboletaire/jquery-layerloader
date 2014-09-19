/**
 * Simple preloader for layers
 *
 * @author Òscar Casajuana <elboletaire at underave dot net>
 * @version  0.2
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function($, undefined) {
    var LayerLoader = function(layer, options) {
        var defaults = {
            text        : "Loading...",
            line_height : undefined,
            class       : 'ajax-layer-loader'
        },
        loader_wrapper,
        height;

        options = $.extend(options, defaults);

        height = options.line_height || layer.outerHeight();

        this.loading = false;

        function init() {
            // We need the layer as relative..
            if (layer.css("position") != 'relative' && layer.css("position") != 'absolute') {
                layer.css("position", "relative");
            }

            // The content of the loader...
            var loader_content = $("<span>").text(options.text);

            loader_wrapper = $("<div>").addClass(options.class).hide();
            this.adjustHeight(height);
            layer.prepend(loader_wrapper.html(loader_content));
        }

        this.adjustHeight = function(line_height) {
            height = line_height || layer.outerHeight();
            // We want the "loading.." text centered vertically
            loader_wrapper.css({
                lineHeight : height + 'px',
                height     : height + 'px'
            });
            return this;
        };

        this.start = function(callback) {
            this.loading = true;
            loader_wrapper.stop(true, true).fadeIn(function(){
                if (typeof callback == 'function') {
                    callback();
                }
            });
            return this;
        };

        this.stop = function(callback) {
            this.loading = false;
            loader_wrapper.stop(true, true).fadeOut(function(){
                if (typeof callback == 'function') {
                    callback();
                }
            });
            return this;
        };

        this.setText = function(text) {
            loader_wrapper.children('span').text(text);
            return this;
        };

        init.call(this);
        return this;
    };

    $.fn.layerloader = function(options) {
        return this.each(function() {
            var loader = new LayerLoader($(this), options);
            $(this).data('api', loader);
        });
    };
})(jQuery);

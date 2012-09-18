/**
 * jquery.multifile.js
 * by Rocky Meza
 *
 * Multifile is a plugin that provides a better interface for
 * uploading more than one file at a time.
 */
;(function($, global, undefined){
  $.fn.multifile = function(container, templateCb, preview)
  {
    var $container
      , preview_image = preview || false
      , fr = null
      , addInput = function(event)
        {
          var $this = $(this)
            , $rendered_tmpl = null
            , file_obj = $.fn.multifile.getFileObject(this)
            , new_input = $this.clone(true, false);

          if ( preview_image && !fr && global.FileReader )
            fr = new FileReader();

          $this
            .unbind(event)
            .hide()
            .after(new_input);

          templateCb = templateCb || $.fn.multifile.templateCb;

          $rendered_tmpl = templateCb(file_obj)
            .appendTo($container);
          $rendered_tmpl
            .find('.multifile_remove_input')
              .bind('click.multifile', bindRemoveInput($this));
          if ( fr )
          {
            fr.onload = $.fn.multifile.fileReaderEvent($rendered_tmpl, file_obj);
            fr.readAsDataURL(file_obj);
          }
        }
      , bindRemoveInput = function($input)
        {
          // TODO: make this customizable
          return function(event)
          {
            $input.remove();
            $(this).parents('.uploaded_image').remove();

            event.preventDefault();
          };
        };

    if ( container )
    {
      if ( typeof container == 'string' )
        $container = $(container);
      else
        $container = container;
    }
    else
    {
      $container = $('<div class="multifile_container" />');
      this.after($container);
    }

    return this.each(function(index, elem)
    {
      $(this)
        .bind('change.multifile', addInput)
        ;
    });
  };

  $.fn.multifile.image_filter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

  $.fn.multifile.templateCb = function(file)
  {
    return $('<p class="uploaded_image"> \
      <a href="" class="multifile_remove_input">x</a> \
      <span class="filename">'+ file.name +'</span> \
    </p>');
  };

  $.fn.multifile.fileReaderEvent = function($elem, file_obj)
  {
    return function(event)
    {
    if ( $.fn.multifile.image_filter.test(file_obj.type) )
      $elem.find('img.preview')
        .attr('src', event.target.result);
    else
      $elem.find('a.preview')
        .attr('href', event.target.result)
        .html(file_obj.name);
    };
  };

  $.fn.multifile.getFileObject = function(input)
  {
    var file = {};
    // check for HTML5 FileList support
    if ( !!global.FileList )
    {
      if ( input.files.length == 1 )
        file = input.files[0];
      else
      {
        file._multiple = true;

        // We do this in order to support `multiple` files.
        // You can't display them separately because they 
        // belong to only one file input.  It is impossible
        // to remove just one of the files.
        file.name = input.files[0].name;
        for (var i = 1, _len = input.files.length; i < _len; i++)
          file.name += ', ' + input.files[i].name;
      }
    }
    else
    {
      file._html4 = true;
      file.name = input.value;
    }

    return file;
  };
})(jQuery, this);

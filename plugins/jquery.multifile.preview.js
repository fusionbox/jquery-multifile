;(function($, global, $multifile){

  $multifile.templateCb = function(file){
    var fr = null
    , $tmpl = $('<p class="uploaded_image"> \
      <a href="" class="multifile_remove_input">x</a> \
      <span class="filename">'+ file.name +'</span> \
      <img class="preview" />
      <a class="preview">' + file.name + '</a></span>
    </p>');
    fr = new FileReader();
    fr.onload = $multifile.fileReaderCb($tmpl, file);
    fr.readAsDataURL(file);
    return $tmpl;
  };

  $multifile.image_filter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

  $multifile.fileReaderCb = function($tmpl, file_obj){
    return function(event)
    {
      if ( $multifile.image_filter.test(file_obj.type) )
        $tmpl.find('img.preview')
          .attr('src', event.target.result);
      else
        $tmpl.find('a.preview')
          .attr('href', event.target.result)
          .html(file_obj.name);
    };
  };

})(jQuery, this, $.fn.multifile);

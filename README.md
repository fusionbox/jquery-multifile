# jquery.multifile.js

## The Problem
HTML file inputs suck... it is difficult to upload more than one file at a time.  HTML5 brought the multiple attribute, but this is still a poor interface because it doesn't allow for files from different directories to be selected and it's just not a good experience.

## The Solution
`jquery.multifile.js` tries to resolved this problem by creating multiple file inputs.  When one file input is filled out, it is hidden and a new one appears.  It gives the user an editable list of files entered so far.  It supports

* IE7 (maybe even 6)
* file input multiple attribute
* templating, you could even add thumbnails if you want (using the [File API](https://developer.mozilla.org/en/DOM/File#getAsDataURL(\)))

`jquery.multifile.js` can use the File API, but it doesn't need it to work.  You can use it in any browser, even IE.

## Example
### HTML
    <input class="multifile" type="file" name="files[]">

### JavaScript
    $('.multifile').multifile();

## Customization example
You can customize plugin by setting target container (using jquery selectors) for uploaded files and specifying template for each file

    $('.multifile').multifile({
        container: "#upload-container",
        template: function (file) {
            var fileName = file.name;
            var fileExtension = file.name.split('.').pop();

            var result =
                '<p class="uploaded_image">' +
                '<a href="#" class="multifile_remove_input">Close me</a>' +
                '<span class="filename">$fileName ($fileExtension)</span>' +
                '</p>';

            result = result.replace('$fileExtension', fileExtension).replace('$fileName', fileName)

            return $(result);
        }
    })


## Options
There are several optional options you can pass into multifile:

- **container** - A jQuery-able (selector, element, jQuery object, etc.) where
  the files to be uploaded should be put.

- **template** - A callback for creating the file preview.

## Plugins

### jquery.multifile.preview

To add image previews add a script tag with the `src` attribute set to the 
`jquery.multifile.preview` plugin **after** `jquery.multifile.js`.

    <script src="js/jquery.multifile.js" />
    <script src="js/jquery.multifile.preview.js" />

Now there is an `img.multifile_preview` element that will use the [FileReader API] 
to set the `src` to the DataURI of the file to be uploaded.

**Note** The browser must have support for the [FileReader API] and the [Data URI scheme]

[FileReader API]: https://developer.mozilla.org/en-US/docs/DOM/FileReader "FileReader"
[Data URI scheme]: https://en.wikipedia.org/wiki/Data_URI_scheme "Data URI"

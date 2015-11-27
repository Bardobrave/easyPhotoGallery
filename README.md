# easyPhotoGallery
An easy to use, lightweight, javascript photo gallery ready to work out of the box

This project's born from the necessity to include a photo gallery in one of our projects at my current job. There are virtually thousands of different javascript photo galleries nowadays in the wild, however, experience had demonstrated that there are many products that doesn't fit to our basic needs, or worse, are poorly developed and full of unnecessary features that add no value to the pack but in change force to include several dependencies into your project.

So this photo gallery seek two main objectives:
<ul>
  <li>Be easy to use and simple. Any programmer just need to add a container in his pages to hold the gallery and pass it an array of images.</li>
  <li>Be clean and lightweight, even if this means to lack some features</li>
</ul>

<a href="https://jsfiddle.net/bardobrave/o8oL3phL/embedded/result/" target="_blank">Here you have a jsfiddle with a simple example of use</a>

# Feature list and pending job.

Once a gallery object is created, a thumbnail gallery is created inside the container passed to the constructor. Thumbnails are arranged floated to the left and displayed at 200x200 pixels.

The thumbnail gallery isn't loaded until each image is preloaded on the background, a spinner is shown while images are preloaded. After 5 secs, if not every image has been preloaded, the ones that made it are pushed to the gallery, while a message is recorded in the console with the number of images that cannot made it. The load event on the images still apply... so slow images will eventually load onto the gallery, but not until they are fully preloaded.

This effect IMHO is quite better than the partial loading of the images when they are too big or slowed by a hindered internet connection. The only hindrance is that "delayed" images won't get their click event until all of them are loaded. I mean, if images 1, 2, and 3 load ok while image 4 last about 7 seconds to load and image 5 more than 15 seconds. At 5 seconds the thumbnail gallery will load with images 1, 2, and 3. Image 4 will pop on second 7, but it won't have a thumbnail click event until second 15 more or less that the last image arrives.

Each thumbnail has an event listener attached that opens a modal layer where it's original image is portrayed. If the image is greater than 800x600 pixels it's displayed at this hard limit. On it's sides, two buttons allows to transition between different images on the collection. If user clicks with the mouse outside of the enlarged image or the transition buttons, the modal layer is closed.

This plugin is plain javascript and doesn't have any external dependency other than execute on CSS3 able browsers for image transitions to work and font-awesome for next and previous buttons (this can be easily modified to use fixed images or other vectorial font type).

<h3>TO DO LIST</h3>
<ul>
  <li>It would be desirable to allow different arrangement options for the thumbnails, also different image sizes for them</li>
  <li>More test on image resolutions lesser than 800x600 is needed.</li>
  <li>Adding support for mobile screen resolutions</li>
  <li>More configuration options are desirable: to select between different transitions or directly don't use them, to change appaerance or positioning of transition buttons, to select enlarged image size, etc...</li>
  <li>Add drag and swipe events to allow pictures to cycle easily on tablets and smartphones</li>
  <li>Study the possibility to change picture resolution depending on portrait orientation or original resolution</li>
</ul>

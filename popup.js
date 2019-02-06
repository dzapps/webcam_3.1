
/*
const constraints = window.constraints = {
    audio: false,
    video: true
  };
  
  function handleSuccess(stream) {
    const video = document.getElementById('video');
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
  }
  async function init(e) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
      e.target.disabled = true;
    } catch (e) {
      handleError(e);
    }
  }
  
  document.querySelector('#showVideo').addEventListener('click', e => init(e))*/
  (function (){
    var
          file
        , webcam // current Camera
        , filter = 'vintage' // default filter
        , processing = false
    ;

    function _choose(state){
        choose.style.display = state ? '' : 'none';
        photoBooth.style.visibility = !state ? '' : 'hidden';
        photoBooth.style.height = !state ? '' : '20px';
    }

    // Open PhotoBooth
    FileAPI.event.on(openCam, 'click', function (){
        _choose(false);
        output.style.display = 'none';

        FileAPI.Camera.publish(cam, { width: 640, height: 480 }, function (err, cam){
            if( err ){
                _choose(true);
                alert(err);
            } else {
                webcam = cam;
            }
        });
    });


    // Create shot
    FileAPI.event.on(shot, 'click', function (){
        if( webcam ){
            file = webcam.shot();

            webcam.stop();
            webcam = null;

            _choose(true);
            _applyFilter(true);
        }
    });


    // Open dialog
    FileAPI.event.on(browse, 'change', function (evt){
        file = FileAPI.getFiles(evt)[0];

        if( file ){
            _applyFilter(true);
        }
    });


    // Set filter
    FileAPI.event.on(PresetFilters, 'click', function (evt){
        var el = evt.target;

        if( !processing && el.tagName == 'A' ){
            filter = el.dataset.preset;
            processing = { el: el, html: el.innerHTML };

            el.parentNode.querySelector('.Active').classList.remove('Active');
            el.innerHTML = 'Rendering&hellip;';
            el.className = 'Active';

            _applyFilter();
        }
    });


    function _applyFilter(loading){
        if( loading ){
            result.innerHTML = '<div class="loader"></div>';
        }
        output.style.display = '';

        FileAPI.Image(file)
            .resize(800, 600, 'max')
            .filter(filter)
            .get(function (err, img){
                result.innerHTML = '';
                result.appendChild(img);

                if( processing ){
                    processing.el.innerHTML = processing.html;
                    processing = false;
                }
            })
        ;
    }
})();
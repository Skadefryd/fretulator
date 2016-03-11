(function() {
  var x = document.getElementsByClassName('js_stringtuning');
  if (x && x.length > 0) {
    for (var i = 0; i < x.length; i++) {
      var tuner = x[i];
      tuner.addEventListener('change', function(e) {
        e.preventDefault();
        var tuning = this.options[this.options.selectedIndex].value;
        var string = this.dataset.value;
        tuneFretboard(string, tuning);
      });
    }
  }

  function tuneFretboard(string, tuning) {
    var fretNodeName = '.' + string + ' .fret';
    var tuning = Number(tuning);
    var outsidescale = tuning+11;
    var el = document.querySelectorAll(fretNodeName);

    removeClass(fretNodeName,'hidden');
    
    for (var x = 0; x < el.length; x++) {
      //console.log('x=' + x + ' tuning=' +tuning + ' outsidescale=' + outsidescale )
      if (x < tuning || x > (outsidescale)){
        //console.log( x + '<' + tuning + ' =hidden' )
        el[x].classList.add('hidden');  
      }
    }
  }
  function removeClass(el,rmClass){
    var el = document.querySelectorAll(el);
    for (var i = 0; i < el.length; i++) {
      el[i].classList.remove('hidden');
    }
  }
  
  var inputs = document.querySelectorAll(".active-notes input[type='checkbox']");
  if(inputs && inputs.length > 0) {
      for(var i = 0; i < inputs.length; i++) {
          var checknote = inputs[i];
          checknote.addEventListener('click', function(e) {
              if (this.checked){
                document.querySelector('#activeNotes').classList.add(this.value);
                document.querySelector('.slide-wrap.'+this.value).classList.add('on');
              } else {
                document.querySelector('#activeNotes').classList.remove(this.value);
                console.log(this.value);
                document.querySelector('.slide-wrap.'+this.value).classList.remove('on');
              }
          });
      }
  }
  
  var scalebuttons = document.getElementsByClassName('scaleButton');
  if(scalebuttons && scalebuttons.length > 0) {
    for(var i=0; i < scalebuttons.length; i++) {
      var button = scalebuttons[i];
      button.addEventListener('click', function(e) {
        e.preventDefault();
        var value = this.dataset.value;
        triggerNoteButtons(value);
      });
    }
  }
  
  function triggerNoteButtons(notes){
    var noteButtons = document.querySelectorAll('.slide-wrap');
    var noteArray = new Array();
    noteArray = notes.split(","); 
    resetFretboard();
    /* set rootnote */
    document.querySelector('#activeNotes').classList.add(noteArray[0]);
    for(var i=0; i < noteButtons.length; i++){
      noteButtons[i].querySelector('input').checked=false;
      noteButtons[i].classList.remove('on');
    }
    for(var i=0; i < noteButtons.length; i++){
      for(var s=0; s < noteArray.length; s++){  
      
      
      if (noteButtons[i].classList.contains(noteArray[s])) {
        //console.log('nB'+i+' in collection (nb:'+i+', na:'+noteArray[s]+')');
        noteButtons[i].querySelector('input').click();
        noteButtons[i].classList.add('on');
      } 
    }
  }
}
  function resetFretboard(){
    document.getElementById("activeNotes").className = "";
  }
                                
})();

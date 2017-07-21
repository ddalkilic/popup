(function() {

  var Popup = function () {
    // variable
    var params = {
      //
      width: 500,
      title: 'Başlık',
      contents: '',
      contentInit: '',
      closeColor: '#000',
      closeShow: true,
      close: '<i class="fa fa-close"></i>',
      animation: true,
      fullWidth: false,
      background: "",
      backgroundColor: "#ffffff",
      getClass: '',
      size: 'auto',
      animatedPrivate: 'animated',
      animated: 'fadeInUp',
      animatedClose: 'fadeOutLeft',
      popupClassName: 'popup',

      // modal html
      popupName: 'popup',
      overlayName: 'overlay',
      popupMainName: 'popup-main',
      popupHeadName: 'popup-head',
      popupHeadTitleName: 'popup-head-title',
      popupHeadCloseName: 'popup-close',
      popupContentName: 'popup-content',
      popupFooterName: 'popup-footer'

    };

    // extend variable
    this.defaults = Object.assign(params, arguments[0]);

    this.wrapperHtml     = '';
    this.bodyMainContent = document.querySelector('body');
    this.popupControl   = document.querySelector('.' + this.defaults.popupName);

    this.popupCont = null;
    this.overlay = null;
    this.popupMain = null;
    this.popupHead = null;
    this.popupHeadTitle = null;
    this.popupHeadClose = null;
    this.popupContent = null;
    this.popupFooter = null;


    // changes html veriables
    this.dom = null;

    if(!this.popupControl){
      this.htmlAdd();
      this.size();
    }


    var self = this;
    self.popupHeadClose.addEventListener('click', function(){
      self.close();
    });

  }

  // html Add
  Popup.prototype.htmlAdd = function () {

    var self = this;

    this.wrapperHtml = '<div class="' + this.defaults.overlayName + '"></div>';
    this.wrapperHtml += '<div class="' + this.defaults.popupMainName + '">';
    this.wrapperHtml += '<div class="' + this.defaults.popupHeadName + '">';
    this.wrapperHtml += '<div class="' + this.defaults.popupHeadTitleName + '"></div>';
    this.wrapperHtml += '<div class="' + this.defaults.popupHeadCloseName + '"></div></div>';
    this.wrapperHtml += '<div class="' + this.defaults.popupContentName + '"></div>';
    this.wrapperHtml += '<div class="' + this.defaults.popupFooterName + '"></div>';
    this.wrapperHtml += '</div></div>';

    // create popup
    this.dom = document.createElement('div');
    this.dom.className = this.defaults.popupName;
    this.dom.innerHTML = this.wrapperHtml;

    this.bodyMainContent.appendChild(this.dom);


    this.variableAssign();
    this.contentAdd();

    // popup main add class
    if(this.defaults.getClass != ""){
      this.dom.classList.add(this.defaults.getClass);
    }

    // add show class
    setTimeout(function () {
      if(self.defaults.animated != ""){
        self.popupMain.classList.add(self.defaults.animatedPrivate, self.defaults.animated, 'show');
      }else {
        self.popupMain.classList.add('show');
      }
    }, 200);

    // title control
    if (this.defaults.title != "" && this.defaults.title != undefined) {
      this.popupHeadTitle.innerHTML = this.defaults.title;
    }

    // close button control
    if (this.defaults.closeShow == true) {
      this.popupHeadClose.style.color = this.defaults.closeColor;
      this.popupHeadClose.innerHTML = this.defaults.close;
    }

    this.style();
    this.size();
    this.scrollDisabled();
  }

  // popup variable assignment
  Popup.prototype.variableAssign = function() {
    this.popupCont   = document.querySelector('.' + this.defaults.popupName);
    this.overlay = this.dom.querySelector('.' + this.defaults.overlayName);
    this.popupMain = this.dom.querySelector('.' + this.defaults.popupMainName);
    this.popupHead = this.dom.querySelector('.' + this.defaults.popupHeadName);
    this.popupHeadTitle = this.dom.querySelector('.' + this.defaults.popupHeadTitleName);
    this.popupHeadClose = this.dom.querySelector('.' + this.defaults.popupHeadCloseName);
    this.popupContent = this.dom.querySelector('.' + this.defaults.popupContentName);
    this.popupFooter = this.dom.querySelector('.' + this.defaults.popupFooterName);
  }

  // popup content add
  Popup.prototype.contentAdd = function () {
    if(this.defaults.contents != "" && this.defaults.contents != undefined) {
      defaults.popupContent.innerHTML = this.defaults.contents;
    } else {
      var content = document.querySelector(this.defaults.contentInit).innerHTML;
      this.popupContent.innerHTML = content;
    }
  }

  // popup auto size
  Popup.prototype.size = function () {

    var winHeight      = window.innerHeight,
      popupHeight    = this.popupMain.offsetHeight;

    if(this.defaults.width > 0 && this.defaults.width != "") {
      if (this.popupHeight > this.winHeight) {
        this.popupMain.style.width = this.defaults.width + "px";
        this.popupMain.style.top = "30px";

      } else {
        console.log((winHeight - popupHeight) / 2.3);
        this.popupMain.style.width = this.defaults.width + "px";
        this.popupMain.style.top   = (winHeight - popupHeight) / 2.3 + "px";
      }

      // full size
      if (this.defaults.size === "full") {
        defaults.popupMain.style.width = "100%";
        defaults.popupMain.style.height = "100%";
        defaults.popupMain.style.top = "0";
        defaults.popupMain.style.maxWidth = "none";
      }
    }

  };

  // popup style
  Popup.prototype.style = function () {

    // background color
    if (this.defaults.backgroundColor != "" && this.defaults.backgroundColor != undefined && this.defaults.background == "") {
      this.popupMain.style.backgroundColor = this.defaults.backgroundColor;
    }
    // background image and color
    else if(this.defaults.background != "" && this.defaults.backgroundColor != ""){
      this.popupMain.style.background = this.defaults.backgroundColor + " url(" + defaults.background + ") no-repeat center";
    }
    // background image
    else if (this.defaults.background != "" ) {
      this.popupMain.style.background = "url(" + defaults.background + ")";
    }
  }

  // popup Close
  Popup.prototype.close = function () {
    var self = this;

    this.scrollEnabled();

    this.popupMain.classList.remove(this.defaults.animated);
    this.popupMain.classList.add(this.defaults.animatedClose);

    setTimeout(function() {
      self.popupCont.parentNode.removeChild(self.popupCont);
    }, 300);
  }


  // html and body scroll bar disabled
  Popup.prototype.scrollDisabled = function () {
    document.styleSheets.overlayY = 'hidden';
  }

  // html and body scroll bar enabled
  Popup.prototype.scrollEnabled = function () {
    document.styleSheets.overlayY = 'auto';
  }

  window.popup = Popup;

})();
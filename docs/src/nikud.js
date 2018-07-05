$(document).ready(function () {
  jQuery.fn.extend({
    nikud: function () {
      $(this).each(function (i, input) {
        if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
          new SetNikud(input);
        }
      });
    }
  });
});

function isHebrew (c) {
  return (c >= 1488 && c <= 1514);
}

function isNikud (c) {
  return (c > 1455 && c < 1470);
}

function isDagesh (c) {
  return (c === 1468);
}

var SetNikud = function (input) {
  var self = this;

  self.nikudInput = $(input).wrap('<div class="nikud-wrap"></div>');
  self.nikudDiv = self.nikudInput.closest('.nikud-wrap');
  self.nikudInput.after(self.keyboardHtml);

  self.allKeys = self.nikudDiv.find('.nikud-key');
  self.nikudKey = self.nikudDiv.find('.nikud-key:not(#nikud-key-dagesh)');
  self.dageshKey = self.nikudDiv.find('#nikud-key-dagesh');

  self.checkChars = function () {
    var val = self.nikudInput.val();
    var currentChar = val.charCodeAt(self.nikudInput[0].selectionEnd - 1);
    var secoundCurrentChar = val.charCodeAt(self.nikudInput[0].selectionEnd - 2);

    if (isNaN(currentChar) || !isHebrew(currentChar)) {
      self.allKeys.addClass('-disabled');
      if ((isNikud(currentChar) && isDagesh(secoundCurrentChar)) || (isDagesh(currentChar) && isNikud(secoundCurrentChar))) {
        // do nothing
      } else if (isNikud(currentChar) && !isDagesh(currentChar)) {
        self.dageshKey.removeClass('-disabled');
      } else if (isDagesh(currentChar)) {
        self.nikudKey.removeClass('-disabled');
      }
    } else {
      self.allKeys.removeClass('-disabled');
    }
  };

  self.checkChars();
  self.nikudInput.keyup(self.checkChars);
  self.nikudInput.mouseup(self.checkChars);

  self.nikudDiv.find('.nikud-key').click(function () {
    if (!$(this).hasClass('-disabled')) {
      var pos = self.nikudInput[0].selectionEnd;
      self.nikudInput.val(
        self.nikudInput.val().slice(0, pos) + $(this).attr('data-nikud') + self.nikudInput.val().slice(pos)
      );
      self.nikudInput[0].setSelectionRange(pos + 1, pos + 1);
      self.checkChars();
    }
  });
  self.nikudDiv.click(function () {
    self.nikudInput.focus();
  });

  // set autofocus:
  var attr = self.nikudInput.attr('autofocus');
  if (typeof attr !== typeof undefined && attr !== false) {
    self.nikudInput.focus();
  }
};

SetNikud.prototype.keyboardHtml = '<div class="nikud-keyboard">\
    <div class="nikud-key" id="nikud-key-kamatz" data-nikud="ָ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-patach" data-nikud="ַ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-tzere" data-nikud="ֵ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-segol" data-nikud="ֶ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-hiriq" data-nikud="ִ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-holam" data-nikud="ֹ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-kubutz" data-nikud="ֻ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-shva" data-nikud="ְ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-Hataf-kamatz" data-nikud="ֳ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-Hataf-patach" data-nikud="ֲ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-Hataf-segol" data-nikud="ֱ">\
      <span>○</span>\
    </div>\
    <div class="nikud-key" id="nikud-key-dagesh" data-nikud="ּ">\
      <span>○</span>\
    </div>\
  </div>';

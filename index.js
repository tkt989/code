
function makeCode(text) {
  var qr = qrcode(20, "L")
  qr.addData(text)
  qr.make()
  var svgDoc = new DOMParser().parseFromString(qr.createSvgTag(2, 0), "image/svg+xml")
  var svg = svgDoc.getElementsByTagName("svg")[0]
  svg.removeAttribute("width")
  svg.removeAttribute("height")
  document.querySelector("#code").innerHTML = new XMLSerializer().serializeToString(svg)
}

window.onload = function () {
  var textDiv = document.querySelector("#text")
  var codeDiv = document.querySelector("#code")
  var text = ""
  var func = _.debounce(unkey, 500)

  makeCode(text)

  window.onkeydown = function (event) {
    if ((event.key >= "a" && event.key <= "z")) {
      text += event.key
      makeCode(text)
      textDiv.innerHTML = text

      key()
    }
  }

  function key() {
    codeDiv.classList.add("key")
    textDiv.classList.add("key")

    func()
  }

  function unkey() {
    codeDiv.classList.remove("key")
    textDiv.classList.remove("key")
  }
}
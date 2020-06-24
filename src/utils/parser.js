const dateFns = require('date-fns')

export var parser = {
  isNumeric: function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  },
  isValidPassword: function (pwd) {
    // ^                  Start anchor
    // (?=.*[A-Z])        Ensure string has a uppercase letter.
    // (?=.*[0-9])        Ensure string has a digit.
    // (?=.*[a-z])        Ensure string has a lowercase letter.
    // .{8,100}           Ensure string is of length more than 8, less than 100.
    // $                  End anchor.
    var pattern = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,100}$/)
    return pattern.test(pwd)
  },
  getParameterByName: function (name) {
    const url = window.location.href
    var hashes = url.split('#');
    let value = ''
    hashes.forEach(hash => {
      let segments = hash.split('&')
      segments.forEach(segment => {
        let pieces = segment.split('=')
        if (pieces && pieces.length > 0 && pieces[0] === name) {
          value = pieces[1]
        }
      })
    })
    return value
    // name = name.replace(/[[]]/g, "\\$&")
    // var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    //     results = regex.exec(url)
    // if (!results) return null
    // if (!results[2]) return ''
    // return decodeURIComponent(results[2].replace(/\+/g, " "))
  },
  truncate: function (val, len) {
    if (!val || val.trim() === '' || val.length <= len) { return val }
    return val.substr(0, len) + (val.length > len ? '...' : '')
  },
  capitalize: function (value) {
    return value ? value.substr(0, 1).toUpperCase() +
      value.substr(1).toLowerCase() : ''
  },
  roundTo: function (x, n) {
    if (!this.isNumeric(x)) { return x }
    var value = x
    var result = (Math.round(Math.abs(x) * Math.pow(10, n)) / Math.pow(10, n))
    result = (value < 0) ? (-1 * result).toFixed(n) : result.toFixed(n)
    return result
  },
  shortDate: function (val, format='MMM dd, yyyy') {
    try {
        if (!val) {return ''}
        const dt = new Date(val)
        const res = dateFns.format(dt, format)
        return res
    } catch (error) {
        console.log('ERROR DATE SHort Date', error)
        return val
    }
  },
  shortDateTime: function (val) {
    if (!val) { return '' }
    try {
      return dateFns.format(new Date(val), 'Pp')
    } catch (error) {
      console.warn('Invalid date. SHort Time', error)
      return val
    }
  },
  isFutureDate: function (val) {
    if (!val) { return false }
    return dateFns.isFuture(new Date(val))
  },
  dateDistance: function (val) {
    try {
      const res = dateFns.formatDistance(new Date(val), new Date())
      return res
    } catch (error) {
      console.log('ERROR DATE Long Date', error)
      return val
    }
  },
  getExportFile: function (base64Data) {
    // helper function: generate a new file from base64 String
    const base64ToBlob = (dataurl) => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1]
      const sliceSize = 1024;
      const byteChars = window.atob(arr[1]);
      const byteArrays = [];

      for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        let slice = byteChars.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, {type: mime});
    }

    const getFilename = (dataUrl) => {
      const arr = dataUrl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];

      return Math.round(+new Date()/1000) + '.' + mime.split('/').pop();
    }

    const blob = base64ToBlob(base64Data);
    blob.name = getFilename(base64Data);

    // generate file from base64 string
    return blob;
  }
}

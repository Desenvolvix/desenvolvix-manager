document.addEventListener("DOMContentLoaded", function () {
  const telInput = document.getElementById("telContact");

  telInput.addEventListener("input", function () {
    this.value = formatPhoneNumber(this.value);
  });

  function formatPhoneNumber(phoneNumber) {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    let formattedPhoneNumber = "";

    if (cleanedPhoneNumber.length <= 2) {
      formattedPhoneNumber = cleanedPhoneNumber;
    } else if (cleanedPhoneNumber.length <= 6) {
      formattedPhoneNumber = `(${cleanedPhoneNumber.slice(
        0,
        2
      )}) ${cleanedPhoneNumber.slice(2)}`;
    } else if (cleanedPhoneNumber.length <= 10) {
      formattedPhoneNumber = `(${cleanedPhoneNumber.slice(
        0,
        2
      )}) ${cleanedPhoneNumber.slice(2, 6)}-${cleanedPhoneNumber.slice(6)}`;
    } else {
      formattedPhoneNumber = `(${cleanedPhoneNumber.slice(
        0,
        2
      )}) ${cleanedPhoneNumber.slice(2, 7)}-${cleanedPhoneNumber.slice(7, 11)}`;
    }

    return formattedPhoneNumber;
  }

  telInput.value = formatPhoneNumber(telInput.value);
});

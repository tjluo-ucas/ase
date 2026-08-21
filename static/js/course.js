(function () {
  var toggle = document.querySelector('.nav-toggle');
  var navigation = document.querySelector('.primary-nav');
  if (!toggle || !navigation) return;

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('is-open', !expanded);
  });

  navigation.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      toggle.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });
}());

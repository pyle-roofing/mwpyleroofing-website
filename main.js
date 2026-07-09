document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Contact form
  var form = document.querySelector('.contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var honeypot = form.querySelector('.hp-field input');
      if (honeypot && honeypot.value) return;
      var btn = form.querySelector('.submit-btn');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      status.className = 'form-status';
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (r) {
        if (r.ok) {
          form.reset();
          status.textContent = "Thanks — your message has been sent. We'll get back to you within the day.";
          status.className = 'form-status success';
          btn.textContent = 'Message sent';
        } else {
          throw new Error();
        }
      }).catch(function () {
        status.textContent = "Sorry, that didn't send. Please call us on 01323 767955 or email mwpyleroofing@gmail.com directly.";
        status.className = 'form-status error';
        btn.disabled = false;
        btn.textContent = 'Send message';
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(q) {
    q.addEventListener('click', function() {
      var item = q.parentElement;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });
});

/**
 * Custom Header - component-custom-header.js
 * Pure vanilla JS. No dependencies, no frameworks.
 * Handles the smooth open/close transition of the mobile
 * tagline + button panel, and swaps the menu/close icon.
 */
(function () {
  'use strict';

  function initCustomHeader(header) {
    var toggle = header.querySelector('[data-cheader-toggle]');
    var panel = header.querySelector('[data-cheader-panel]');

    if (!toggle || !panel) return;

    function openPanel() {
      header.setAttribute('data-open', 'true');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closePanel() {
      header.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    }

    function togglePanel() {
      var isOpen = header.getAttribute('data-open') === 'true';
      if (isOpen) {
        closePanel();
      } else {
        openPanel();
      }
    }

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      togglePanel();
    });

    // Close the panel automatically if the viewport is resized
    // up to desktop width, so it doesn't stay "stuck" open.
    var mql = window.matchMedia('(min-width: 750px)');
    function handleViewportChange(e) {
      if (e.matches) {
        closePanel();
      }
    }
    if (mql.addEventListener) {
      mql.addEventListener('change', handleViewportChange);
    } else if (mql.addListener) {
      // Safari fallback
      mql.addListener(handleViewportChange);
    }

    // Close on Escape key for accessibility.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.getAttribute('data-open') === 'true') {
        closePanel();
        toggle.focus();
      }
    });
  }

  function initAll() {
    var headers = document.querySelectorAll('[data-cheader]');
    headers.forEach(initCustomHeader);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Re-init if the section is re-rendered inside the theme editor.
  document.addEventListener('shopify:section:load', function (event) {
    var header = event.target.querySelector('[data-cheader]');
    if (header) initCustomHeader(header);
  });
})();

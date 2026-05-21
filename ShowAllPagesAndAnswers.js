// ==UserScript==
// @name         derStandard-Forum - Alle Seiten und Antworten anzeigen
// @description  Zeigt in STANDARD-Foren wirklich alle Seiten und Antworten an. Beachte: Bei langen Foren kann das einige Zeit dauern und die Perfomance des Browsers verringern!
// @version      20260521-2310
// @author       Dark Matters
// @icon         https://b.staticfiles.at/s/icons/nachrichten/favicon-16x16.png
// @license      GNU GPLv3 <http://www.gnu.org/licenses/gpl-3.0.html>
// @ ----------------------------------------------------------------------------
// @homepage     https://github.com/derstandard-forum/userscripts/wiki
// @supportURL   https://github.com/derstandard-forum/userscripts/issues
// @downloadURL  https://raw.githubusercontent.com/derstandard-forum/userscripts/refs/heads/main/ShowAllPagesAndAnswers.js
// @updateURL    https://raw.githubusercontent.com/derstandard-forum/userscripts/refs/heads/main/ShowAllPagesAndAnswers.js
// @namespace    derstandard-forum
// @match        https://www.derstandard.at/*/*
// @match        https://www.derstandard.de/*/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	console.info("BEGIN derStandard-Forum - ShowAllPagesAndAnswers...")

	const forumObserver = new MutationObserver( () => {

		const forum = document.querySelector('dst-forum[contentid]');
		if (!forum) return;

		forumObserver.disconnect();
		const section = forum.shadowRoot.querySelector('section#forum');
		observeButtons(section);

	}) // forumObserver

	function observeButtons(section) {

		const buttonsObserver = new MutationObserver( () => {
			const buttons = section.querySelectorAll('button.thread--more');
			buttons.forEach(btn => btn.click());
		})

		buttonsObserver.observe(section, { childList: true, subtree: true })

	} // observeButtons()

	const postings = document.querySelector('div.story-community-postings');
	forumObserver.observe(postings, { childList: true, subtree: true })

	console.info("END derStandard-Forum - ShowAllPagesAndAnswers.")

})();

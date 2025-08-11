if ( !String.prototype.startsWith ) {
	String.prototype.startsWith = function ( searchString, position ) {
		position = position || 0;
		return this.substr( position, searchString.length ) === searchString;
	};
}

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if ( !Array.prototype.findIndex ) {
	Object.defineProperty( Array.prototype, 'findIndex', {
		value: function ( predicate ) {
			// 1. Let O be ? ToObject(this value).
			if ( this == null ) {
				throw new TypeError( '"this" is null or not defined' );
			}

			var o = Object( this );

			// 2. Let len be ? ToLength(? Get(O, 'length')).
			var len = o.length >>> 0;

			// 3. If IsCallable(predicate) is false, throw a TypeError exception.
			if ( typeof predicate !== 'function' ) {
				throw new TypeError( 'predicate must be a function' );
			}

			// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
			var thisArg = arguments[1];

			// 5. Let k be 0.
			var k = 0;

			// 6. Repeat, while k < len
			while ( k < len ) {
				// a. Let Pk be ! ToString(k).
				// b. Let kValue be ? Get(O, Pk).
				// c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
				// d. If testResult is true, return k.
				var kValue = o[k];
				if ( predicate.call( thisArg, kValue, k, o ) ) {
					return k;
				}
				// e. Increase k by 1.
				k++;
			}

			// 7. Return -1.
			return -1;
		}
	} );
}

function getUrlParameter( name ) {
	name = name.replace( /[\[]/, '\\[' ).replace( /[\]]/, '\\]' );
	var regex = new RegExp( '[\\?&]' + name + '=([^&#]*)' );
	var results = regex.exec( location.search );
	return results === null ? '' : decodeURIComponent( results[1].replace( /\+/g, ' ' ) );
}

var CDC = CDC || {};

function requestChatBot() {
	CDC.partnerUrl = getUrlParameter( 'partnerUrl' );
	if ( 0 === CDC.partnerUrl.indexOf( '//' ) ) {
		CDC.partnerUrl = 'https:' + CDC.partnerUrl;
	}
	CDC.language = getUrlParameter( 'language' );
	if ( '' === CDC.language ) {
		CDC.language = 'en-us';
	} else if ( 'es' === CDC.language || 0 === CDC.language.indexOf( 'es-' ) ) {
		CDC.language = 'es-us';
	} else if ( 'ko' === CDC.language || 0 === CDC.language.indexOf( 'ko-' ) ) {
		CDC.language = 'ko-kr';
	} else if ( 'vi' === CDC.language || 0 === CDC.language.indexOf( 'vi-' ) ) {
		CDC.language = 'vi-vn';
	} else if ( 'zh' === CDC.language || 0 === CDC.language.indexOf( 'zh-' ) ) {
		CDC.language = 'zh-cn';
	}

	var wc = document.getElementById( 'webchat' );
	wc.setAttribute( 'class', CDC.language );

	var oReq = new XMLHttpRequest();
	oReq.addEventListener( 'load', initBotConversation );
	var path = 'https://covid19healthbot.cdc.gov/chatBot?userId=' + Math.random().toString( 36 ).substring( 2 );
	// var path = '/chatBot?userId=' + Math.random().toString( 36 ).substring( 2 );
	oReq.open( 'POST', path );
	oReq.send();
}

function initBotConversation() {
	if ( this.status >= 400 ) {
		alert( this.statusText );
		return;
	}
	// extract the data from the JWT
	var jsonWebToken = this.response;
	var tokenPayload = JSON.parse( atob( jsonWebToken.split( '.' )[1] ) );
	var user = {
		id: tokenPayload.userId,
		name: tokenPayload.userName
	};
	var domain = undefined;
	if ( tokenPayload.directLineURI ) {
		domain = 'https://' + tokenPayload.directLineURI + '/v3/directline';
	}
	var botConnection = window.WebChat.createDirectLine( {
		token: tokenPayload.connectorToken,
		domain: domain
	} );
	botConnection.activity$.filter( function ( activity ) {
		return 'message' === activity.type;
	} ).subscribe( function ( e ) {
		// capture metrics on the events of interest
		if ( s && 'function' === typeof s.tl ) {
			var label = 'selfchecker';
			var interaction = '';
			if ( e.entities && 0 < e.entities.length && 'completion_event' === e.entities[0].name ) {
				interaction = 'completed_' + e.entities[0].message_id.toString();
				s.linkTrackVars = 'prop5,prop8,prop40,prop49,prop46,prop2,prop31,channel';
				s.pageName = null;
				if ( '' !== CDC.partnerUrl ) {
					s.referrer = CDC.partnerUrl;
					s.prop8 = 'Widget';
				}
				if ( '' === CDC.language ) {
					s.prop5 = 'eng';
				} else if ( 'es' === CDC.language || 0 === CDC.language.indexOf( 'es-' ) ) {
					s.prop5 = 'spa';
				} else if ( 'ko' === CDC.language || 0 === CDC.language.indexOf( 'ko-' ) ) {
					s.prop5 = 'kor';
				} else if ( 'vi' === CDC.language || 0 === CDC.language.indexOf( 'vi-' ) ) {
					s.prop5 = 'vie';
				} else if ( 'zh' === CDC.language || 0 === CDC.language.indexOf( 'zh-' ) ) {
					s.prop5 = 'chi';
				} else {
					s.prop5 = 'eng';
				}
				s.prop40 = 'ci-' + label + ': ' + interaction;
				s.tl( true, 'o', label );
			} else if ( e.serviceUrl && 'https://directline.botframework.com/' === e.serviceUrl ) {
				if ( 'en-US' === e.locale && ( 'I agree' === e.text || '동의함' === e.text || 'Tôi đồng ý' === e.text || '我同意' === e.text || 'Acepto' === e.text ) ) {
					interaction = 'started';
					s.linkTrackVars = 'prop5,prop8,prop40,prop49,prop46,prop2,prop31,channel';
					s.pageName = null;
					if ( '' !== CDC.partnerUrl ) {
						s.referrer = CDC.partnerUrl;
						s.prop8 = 'Widget';
					}
					if ( '' === CDC.language ) {
						s.prop5 = 'eng';
					} else if ( 'es' === CDC.language || 0 === CDC.language.indexOf( 'es-' ) ) {
						s.prop5 = 'spa';
					} else if ( 'ko' === CDC.language || 0 === CDC.language.indexOf( 'ko-' ) ) {
						s.prop5 = 'kor';
					} else if ( 'vi' === CDC.language || 0 === CDC.language.indexOf( 'vi-' ) ) {
						s.prop5 = 'vie';
					} else if ( 'zh' === CDC.language || 0 === CDC.language.indexOf( 'zh-' ) ) {
						s.prop5 = 'chi';
					} else {
						s.prop5 = 'eng';
					}
					s.prop40 = 'ci-' + label + ': ' + interaction;
					s.tl( true, 'o', label );
				}
			}
		}
	} );

	var styleOptions = {
		//botAvatarImage: 'https://docs.microsoft.com/en-us/azure/bot-service/v4sdk/media/logo_bot.svg?view=azure-bot-service-4.0',
		botAvatarImage: 'https://www.cdc.gov/TemplatePackage/contrib/widgets/healthBot/covid19/images/cdcLogo.svg',
		botAvatarInitials: 'CDC',
		// userAvatarImage: '',
		userAvatarInitials: 'You',
		hideSendBox: true
	};

	var store = window.WebChat.createStore(
		{},
		function ( store ) {
			return function ( next ) {
				return function ( action ) {
					if ( action.type === 'DIRECT_LINE/CONNECT_FULFILLED' ) {
						// Use the following activity to proactively invoke a bot scenario
						store.dispatch( {
							type: 'DIRECT_LINE/POST_ACTIVITY',
							meta: { method: 'keyboard' },
							payload: {
								activity: {
									type: 'invoke',
									name: 'TriggerScenario',
									locale: CDC.language,
									value: {
										trigger: 'en-us' === CDC.language ? 'covid19' : 'covid19_non_eng'
									}
								}
							}
						} );
					}
					return next( action );
				};
			};
		}
	);

	// hawo: Added middleware to disable card if they are not the most recent one
	var attachmentMiddleware = function () {
		return function (next) {
			return function (card) {
				var attachment = card.attachment;
				var activities = store.getState().activities;
				var messageActivities = activities.filter(function (activity) { return activity.type === 'message'; });
				var recentBotMessage = messageActivities.pop() === card.activity;

				switch (attachment.contentType) {
					case 'application/vnd.microsoft.card.adaptive':
						return window.React.createElement(
							window.WebChat.Components.AdaptiveCardContent,
							{
								actionPerformedClassName: 'card__action--performed',
								content: attachment.content,
								disabled: !recentBotMessage
							}
						);

					case 'application/vnd.microsoft.card.hero':
						return window.React.createElement(
							window.WebChat.Components.HeroCardContent,
							{
								actionPerformedClassName: 'card__action--performed',
								content: attachment.content,
								disabled: !recentBotMessage
							}
						);

					default:
						return next(card);
				};
			};
		};
	};

	var webchatOptions = {
		attachmentMiddleware: attachmentMiddleware,
		directLine: botConnection,
		styleOptions: styleOptions,
		userID: user.id,
		username: user.name,
		locale: CDC.language,
		store: store
	};
	startChat( user, webchatOptions );
}

function startChat( user, webchatOptions ) {
	var botContainer = document.getElementById( 'webchat' );
	window.WebChat.renderWebChat( webchatOptions, botContainer );
}

// hawo: Commented out DOM manipulations

// setInterval( function () {
// 	// remove all buttons except the selected one, change its color, and make unclickable
// 	var buttons = document.getElementsByClassName( 'ac-pushButton' );
// 	for ( let i = 0; i < buttons.length; i++ ) {
// 		buttons[i].addEventListener( 'click', selectOption );
// 		buttons[i].addEventListener( 'click', adaptiveCardsOption );

// 		var allChildren = buttons[i].childNodes;
// 		for ( let j = 0; j < allChildren.length; j++ ) {
// 			allChildren[j].addEventListener( 'click', selectParentOption );
// 		}
// 	}
// 	// Handle the "None of the above" checkbox(es)
// 	var checkbox = $( 'input[value="None of the above"]' );
// 	if ( 0 < checkbox.length ) {
// 		if ( '' !== checkbox.attr( 'cdc-handler-set' ) ) {
// 			checkbox.attr( 'cdc-handler-set', 'true' );
// 			checkbox.on( 'click', handleCheckboxClick );
// 		}
// 	}
// }, 10 );

// function handleCheckboxClick( event ) {
// 	var cb = $( event.target );
// 	var parent = cb.parent( 'div' );
// 	var sibs = parent.prevAll();
// 	if ( cb.prop( 'checked' ) ) {
// 		sibs.find( 'input[type="checkbox"]' ).each( function( index, elem ) {
// 				$( elem ).prop( 'checked', false );
// 				$( elem ).attr( 'disabled', true );
// 		} );
// 	} else {
// 		sibs.find( 'input[type="checkbox"]' ).each( function( index, elem ) {
// 				$( elem ).removeAttr( 'disabled' );
// 		} );
// 	}
// }

// function selectOption( event ) {
// 	disableButtons( event.target );
// }

// function selectParentOption( event ) {
// 	var children = event.target.parentNode.parentNode.childNodes;
// 	disableParentButtons( children, event.target.innerText );
// 	//parentNode.parentNode
// }

// function adaptiveCardsOption( event ) {
// 	var columnSet = $( event.target ).closest( '.ac-columnSet' )[0];
// 	if ( columnSet ) {
// 		var buttonsInColumnSets = columnSet.childNodes;
// 		for ( let j = 0; j < buttonsInColumnSets.length; j++ ) {
// 			var columnSetButtons = buttonsInColumnSets[j].querySelectorAll( 'button' );
// 			if ( columnSetButtons ) {
// 				disableParentButtons( columnSetButtons, event.target.parentNode.parentNode.innerText );
// 			}
// 		}
// 	}
// }

// function grayButton( button ) {
// 	button.style.backgroundColor = '#d9d9d9';
// 	button.style.color = '#ffffff';
// 	button.height = '37px';
// }

// function blueButton( button ) {
// 	button.style.backgroundColor = '#0078d7';
// 	button.style.color = 'white';
// 	button.height = '37px';
// }

// function disableParentButtons( children, targetButton ) {
// 	for ( let i = 0; i < children.length; i++ ) {
// 		var alreadhClicked = false;
// 		for ( var j = 0; j < children[i].classList.length; j++ ) {
// 			if ( children[i].classList[j] === 'old-button' || children[i].classList[j] === 'expandable' ) {
// 				alreadhClicked = true;
// 				break;
// 			}
// 		}

// 		if ( children[i].nodeName === 'BUTTON' && !alreadhClicked ) {
// 			if ( children[i].innerText ) {

// 				if ( children[i].innerText !== targetButton ) {
// 					grayButton( children[i] );
// 				} else {
// 					blueButton( children[i] );
// 				}
// 				children[i].classList.remove( 'ac-pushButton' );
// 				children[i].classList.add( 'old-button' );
// 				setTimeout( function () {
// 					if ( children[i] != null ) {
// 						children[i].onclick = 'null';
// 					}
// 				}, 50 );
// 				children[i].removeEventListener( 'click', selectOption );
// 				children[i].style.outline = 'none';
// 				children[i].style.cursor = 'not-allowed';
// 			}
// 		}
// 	}
// }

// function disableButtons( targetButton ) {
// 	var alreadyClicked = false;
// 	for ( var j = 0; j < targetButton.classList.length; j++ ) {
// 		if ( targetButton.classList[j] === 'old-button' || targetButton.classList[j] === 'expandable' ) {
// 			alreadyClicked = true;
// 			break;
// 		}
// 	}
// 	for ( var k = 0; k < targetButton.parentNode.classList.length; k++ ) {
// 		if ( targetButton.parentNode.classList[k] === 'old-button' || targetButton.parentNode.classList[k] === 'expandable' ) {
// 			alreadyClicked = true;
// 			break;
// 		}
// 	}

// 	if ( alreadyClicked ) {
// 		return;
// 	}

// 	blueButton( targetButton );
// 	targetButton.classList.add( 'old-button' );
// 	targetButton.parentNode.parentNode.parentNode.parentNode.style.cursor = 'not-allowed';
// 	var allChildren = targetButton.parentNode.childNodes;

// 	for ( let i = 0; i < allChildren.length; i++ ) {
// 		if ( allChildren[i].innerText ) {
// 			if ( allChildren[i].innerText !== targetButton.innerText ) {
// 				grayButton( allChildren[i] );
// 			}
// 			allChildren[i].classList.remove( 'ac-pushButton' );
// 			allChildren[i].classList.add( 'old-button' );
// 			allChildren[i].onclick = 'null';
// 			allChildren[i].removeEventListener( 'click', selectOption );
// 			allChildren[i].style.outline = 'none';
// 			allChildren[i].style.cursor = 'not-allowed';
// 		}
// 	}
// }

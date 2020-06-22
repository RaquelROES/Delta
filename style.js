

(function (blink) {
    'use strict';

    var Delta_Style = function () {
            blink.theme.styles.basic.apply(this, arguments);
        },
        page = blink.currentPage;

    Delta_Style.prototype = {
		bodyClassName: 'content_type_clase_Delta',
		parent: blink.theme.styles.basic.prototype,
        ckEditorStyles: {
            name: 'Delta',
            styles: [
                { name: 'Título 1', element: 'h2', attributes: { 'class': 'bck-title1'} },
                { name: 'Título 2', element: 'h3', attributes: { 'class': 'bck-title2'} },
                { name: 'Título 3', element: 'h3', attributes: { 'class': 'bck-title3'} },

                { name: 'Énfasis', element: 'span', attributes: { 'class': 'bck-enfasis'} },
                { name: 'Énfasis Naranja', element: 'span', attributes: { 'class': 'bck-enfasis-naranja'} },

                { name: 'Lista Desordenada', element: 'ul', attributes: { 'class': 'bck-ul'} },
                { name: 'Lista Desordenada 1', element: 'ul', attributes: { 'class': 'bck-ul-1'} },
                { name: 'Lista Desordenada 2', element: 'ul', attributes: { 'class': 'bck-ul-2'} },
                { name: 'Lista Ordenada 1', element: 'ol', attributes: { 'class': 'bck-ol-3' } },
                { name: 'Lista Ordenada 2', element: 'ol', attributes: { 'class': 'bck-ol-4' } },
                { name: 'Lista Ordenada 3', element: 'ol', attributes: { 'class': 'bck-ol-2' } },
                { name: 'Lista Ordenada 4', element: 'ol', attributes: { 'class': 'bck-ol-5' } },
                { name: 'Lista Ordenada 5', element: 'ol', attributes: { 'class': 'bck-ol-6' } },
                { name: 'Lista Ordenada 6', element: 'ol', attributes: { 'class': 'bck-ol-7' } },
                { name: 'Lista Ordenada 7', element: 'ol', attributes: { 'class': 'bck-ol-8' } },
                { name: 'Lista Ordenada 8', element: 'ol', attributes: { 'class': 'bck-ol-9' } },
                { name: 'Lista Ordenada 9', element: 'ol', attributes: { 'class': 'bck-ol-10' } },
                { name: 'Lista Ordenada 10', element: 'ol', attributes: { 'class': 'bck-ol-11' } },
                { name: 'Lista Ordenada 11', element: 'ol', attributes: { 'class': 'bck-ol-12' } },
                { name: 'Lista Ordenada 12', element: 'ol', attributes: { 'class': 'bck-ol-13' } },
                { name: 'Lista Ordenada 13', element: 'ol', attributes: { 'class': 'bck-ol-14' } },
                { name: 'Lista Ordenada 14', element: 'ol', attributes: { 'class': 'bck-ol-15' } },
                { name: 'Lista Ordenada 15', element: 'ol', attributes: { 'class': 'bck-ol-16' } },


                { name: 'Caja simple', type: 'widget', widget: 'blink_box', attributes: { 'class': 'simple' } },
                { name: 'Caja simple 2', type: 'widget', widget: 'blink_box', attributes: { 'class': 'simple-2' } },
                { name: 'Caja simple 3', type: 'widget', widget: 'blink_box', attributes: { 'class': 'simple-3' } },

                { name: 'Tabla', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table'} },
                { name: 'Celda', element: 'td', attributes: { 'class': 'bck-td'} },


                { name: 'Desplegable', type: 'widget', widget: 'blink_dropdown', attributes: { 'class': 'Delta-dropdown' } },
                { name: 'Desplegable 1', type: 'widget', widget: 'blink_dropdown', attributes: { 'class': 'Delta-dropdown-1' } },
                { name: 'Desplegable 2', type: 'widget', widget: 'blink_dropdown', attributes: { 'class': 'Delta-dropdown-2' } },
                { name: 'Desplegable 3', type: 'widget', widget: 'blink_dropdown', attributes: { 'class': 'Delta-dropdown-3' } },

                { name: 'Imagen Sin Bordes', type: 'widget', widget: 'image', attributes: { 'class': 'normal-img' } },
                { name: 'Imagen derecha', element: 'img', attributes: { 'class': 'bck-img right' } },
                { name: 'Imagen izquierda', element: 'img', attributes: { 'class': 'bck-img left' } }
            ]
		},
		slidesTitle: {},
		subunits: [],
		totalSlides: 0,
		subunit_index: 0,
		isModoRevision: false,

        init: function () {
			var that = this;
			this.parent.init.call(that);
			that.addActivityTitle();
			that.fillSlidesTitle();
			that.getActualUnitActivities();
			blink.events.on("course_loaded", function () {
				that.isModoRevision = !($('.modo_revision').hasClass('hidden'));
				that.formatCarouselindicators();
				that.enableSliders();
				that.getDescription();
				that.handleModoRevision(); 
			});
			that.animateNavbarOnScroll();
			that.addSlideNavigators();
			blink.events.on('section:shown', function () {
				var $navbarBottom2 = $('#dLabel');
				var sectionTitle = eval('t' + blink.activity.getFirstSlideIndex(window.activeSlide) + '_slide').title;
				$navbarBottom2.find('.sectionTitle').text(sectionTitle);
			});
        },

		//? BK-19532 
		handleModoRevision: function () {
			var $navbarKlett = $('.Delta-navbar');

			if (this.isModoRevision) { $navbarKlett.addClass('modo_revision'); }

			if (blink.isApp && this.isModoRevision) {
				$('.modo_revision').addClass('is_app');
				$('.actividad.modo-revision').addClass('is_app');
				blink.theme.setTopByHeight('.modo_revision', '.Delta-navbar');
			}
		},
		//? END BK-19352

		removeFinalSlide: function () {
			if (blink.isIosApp && blink.activity.level != 6) {
				var parent = blink.theme.styles.basic.prototype;
				parent.removeFinalSlide.call(this, true);
			}
		},

        configEditor: function (editor) {
            editor.dtd.$removeEmpty['span'] = false;
        },

        addActivityTitle: function () {
            if (!blink.courseInfo || !blink.courseInfo.unit) return;
            $('.libro-left').find('.title').html(function () {
                return blink.courseInfo.unit + ' > ' + $(this).html(); //BK-19111
            });
        },

        fillSlidesTitle: function () {
            var self = this.slidesTitle;
            for (var index = 0; index < window.secuencia.length; index++) {
                var slide = window['t'+index+'_slide'];
                var slideTitle = slide.title;
                slideTitle = slideTitle.replace(/<span class="index">\s*([\d]+)\s*<\/span>/i, '$1. ');
                slideTitle = slideTitle.replace(/\s+/, ' ');
                slideTitle = stripHTML(slideTitle);

                self['t'+index+'_slide'] = slideTitle;
            }
        },

        formatCarouselindicators: function () {
			var subunits = this.subunits,
				that = this,
				totalSlides = 0;
			var $navbarBottom = $('.navbar-bottom');
            var firstSlide = eval('t0_slide');
            var dropDown = '' +
                    '<div class="dropdown">' +
                        '<button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">' +
                            '<span class="sectionTitle"></span>' +
                        '</button>' +
						'<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">';

			var idgrupo = window.idgrupo,
				idalumno = window.idalumno,
				slideNavParams = '';

			if (idgrupo) slideNavParams += '&idgrupo=' + idgrupo;
			if (idalumno) slideNavParams += '&idalumno=' + idalumno;

            $navbarBottom.find('li').tooltip('destroy');

			for (var unit = 0; unit < subunits.length; unit++) {
				if (subunits[unit].titulosSlides) {
					var slideTitNum = subunits[unit].titulosSlides.length;

					for (var sli = 0; sli < slideTitNum; sli++) {
						var tituloSlide = subunits[unit].titulosSlides[sli] || subunits[unit].type;

						if (subunits[unit].id != idclase) {
							dropDown += '<li role="presentation">\
								<a role="menuitem" onclick="redireccionar(\'/coursePlayer/clases2.php?editar=0&idcurso=' + idcurso + '&idclase=' + subunits[unit].id + '&modo='+modoVisualizacion+ ((typeof window.esPopup !== "undefined" && window.esPopup) ? '&popup=1' : '') + '&numSec=' + (sli + 1) + slideNavParams + '\', false, undefined)"></span> <span class="title">' + tituloSlide + '</span></a></li>';
						} else {
							dropDown += '<li role="presentation" data-slide='+ sli +'>\
											<a role="menuitem" ></span> <span class="title">' + tituloSlide + '</span></a></li>';
						}
					}
				}
			}

            dropDown += '' +
                        '</ul>' +
                    '</div>';

            $navbarBottom
                .attr('class', 'Delta-navbar')
                .wrapInner('<div class="navbar-content"></div>')
                .find('ol')
                    .before(dropDown)
                    .wrap('<div id="top-navigator" class="hidden"/>')
                    .end()
                .find('.dropdown')
                    .find('li[data-slide]')
                        .on('click', function () {
                            $navbarBottom.find('ol').find('li').eq($(this).attr('data-slide')).trigger('click');
                        });
            $('#volverAlIndice').click(function() {
                return showCursoCommit();
			});

			if (subunits.length !== 0) {
				for (var i in subunits) {
					if (subunits[i].pags) {
						totalSlides += parseInt(subunits[i].pags);
					}
					if (subunits[i].id && subunits[i].id == idclase) {
						that.subunit_index = i;
					}
				}

				that.totalSlides = totalSlides;
			}

			var sectionTitle = eval('t' + blink.activity.getFirstSlideIndex(window.activeSlide) + '_slide').title;
			$('#dLabel').find('.sectionTitle').text(sectionTitle);

            var curso = blink.getCourse(idcurso);
            curso.done(function () {
				var isIframe = window.frameElement !== null && $(window.parent.document.body).length > 0;
                var units = curso.responseJSON.units;
                var number = 0;
                var dropDownTemas = '' +
                    '<div class="dropdownTemas">' +
                        '<button id="tLabel" type="button" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">' +
                        	'<span id="courseIndex"></span>' +
                                '<div id="nombre-tema-wrapper">' +
                                    '<span id="nombre-tema">' + blink.courseInfo.unit + '</span>' +
								'</div>' +
								'<div id="dropArrow"></div>' +
                        '</button>' +
						'<div id="cross"></div>' 
				if ((!blink.isApp && !isIframe) || (blink.isApp && !that.isModoRevision)) {
					dropDownTemas += '<a href="#" id="goTo-indice">' + text_web.slide_volver_indice + '</a>';
				}
				dropDownTemas += '<ul class="dropdown-menu" role="menu" aria-labelledby="tLabel">';
						
                for (var i in units) {
                    var title = units[i].title;
                    if (title && units[i].subunits.length) { //Si el tema tiene actividades
                        dropDownTemas += '' +
                            '<li role="presentation" class="lista-temas" data-url="' + units[i].subunits[0].url + slideNavParams +'">' +
                                '<a role="menuitem">' + title + '</a>' +
                            '</li>';
                        if (title == blink.courseInfo.unit) number = units[i].number;
                    }
                }

                dropDownTemas += '' +
                        '</ul>' +
                    '</div>';

                $('.dropdown')
                    .before(dropDownTemas)
                    .end()
                    .find('#courseIndex').text(number);

                $('.lista-temas').click(function() {
                    redireccionar($(this).data('url'));
                });

                $('#goTo-indice').click(function(event) {
                    event.stopPropagation();
                    return showCursoCommit();
                });
            });

            if (firstSlide.seccion) {
                $navbarBottom.addClass('first-is-section');
            }


            if (!blink.hasTouch) {
                $navbarBottom
                    .find('ol').find('span')
                        .tooltip({
                            placement: 'bottom',
                            container: 'body'
                        });
            }

            blink.events.trigger(true, 'style:endFormatCarousel');
        },

        addSlideNavigators: function () {
			if ( blink.activity.level !== 6) {
	            var idgrupo = window.idgrupo,
					idalumno = window.idalumno,
					slideNavParams = '',
					strPopup = (typeof window.esPopup !== "undefined" && window.esPopup) ? '&popup=1' : '';

				if (idgrupo) slideNavParams += '&idgrupo=' + idgrupo;
				if (idalumno) slideNavParams += '&idalumno=' + idalumno;

				var self = this.slidesTitle;

				blink.events.on("course_loaded", function(){
					var that = blink.activity.currentStyle,
						subunit_index = parseInt(that.subunit_index);

					$('.slider-control').off('click');

					var $navigator = $('<div class="navigator"><div class="main-navigator"><div class="left"></div><div class="right"></div></div></div>'),
						$leftControl = $('.left.slider-control').clone(),
						$rightControl = $('.right.slider-control').clone();


					var esdeber = blink.activity.esdeber;

					$leftControl.add($rightControl).find('span').remove();

					var slideIndex = 0; // se utiliza como indice para saltarnos los concatenados en el each
					var slidesNav = $('.item-container');
					// Filtramos para que solo coja las slides que no son final slide para iterar sobre ellas
					slidesNav = slidesNav.filter(function (element) {
						if ($(slidesNav[element]).find('#final').length > 0) {
							return false;
						}
						return true;
					})
					slidesNav.sort(function(a,b){
						var indexA = $(a).find('.class_slide').data('slide-index');
						var indexB = $(b).find('.class_slide').data('slide-index');
						return indexA - indexB;
					});
					slidesNav.each(function (index, element) {
						var $itemNavigator = $navigator.clone(),
							$left, $right, hasLeft = false;

						var prevSlide,
							prevIndex =  slideIndex - 1;

						// si  hay una slide anterior se recorre hacia atras hasta que no haya concatenados
						// si estoy en la slide 0 no se pinta
						while (prevIndex >= 0) {
							prevSlide = window['t' + prevIndex + '_slide'];
							if (!esdeber && prevSlide.isConcatenate) {
								prevIndex--;
							} else {
								$left = $leftControl.clone();
								$left.append('<span class="title">' + self['t' + prevIndex + '_slide'] + '</span>');
								$itemNavigator.find('.left').append($left);
								hasLeft = true;
								break;
							}
						}

						slideIndex++;
						var nextSlide;
						// si  hay una slide siguiente se recorre hacia adelante hasta que no haya concatenados
						// si estoy en la slide ultima no se pinta boton next
						while (slideIndex < window.secuencia.length) {
							nextSlide = window['t' + slideIndex + '_slide'];
							if (!esdeber && nextSlide.isConcatenate) {
								slideIndex++;
							} else {
								$right = $rightControl.clone();
								$right.prepend('<span class="title">' + self['t' + slideIndex + '_slide'] + '</span>');
								$itemNavigator.find('.right').append($right);
								hasLeft && $right.parent('.right').addClass('separator');
								break;
							}
						}
						$(element).append($itemNavigator);
					});

					// Navigation change depending on whether the slides are accessed from
					// a book or from a homework link or similar
					if (that.subunits.length !== 0) {
						// Slider controls must allow navigation among all the activity subunits
						// in the current unit.
						$('.left.slider-control, .left.slider-navigator').click(function () {
							if (!$(this).hasClass('disabled')) {
								if (activeSlide == 0 && blink.activity.level !== 6) {
									// BK-19486 audio stop when slider changes.
									if (blink.isApp) {
										blink.rest.closeAudio();
									}
									redireccionar('/coursePlayer/clases2.php?editar=0&idcurso=' +
										idcurso + '&idclase=' + that.subunits[subunit_index - 1].id + '&modo='+modoVisualizacion+strPopup+'&numSec=' +
										that.subunits[subunit_index - 1].numSlides + slideNavParams, false, undefined);
								} else {
									blink.activity.showPrevSection();
								}
							}
						});

						$('.right.slider-control, .right.slider-navigator').click(function () {
							if (!$(this).hasClass('disabled')) {
								if (activeSlide == parseInt(that.subunits[subunit_index].pags) - 1 && blink.activity.level !== 6) {
									// BK-19486 audio stop when slider changes.
									if (blink.isApp) {
										blink.rest.closeAudio();
									}
									redireccionar('/coursePlayer/clases2.php?editar=0&idcurso=' +
										idcurso + '&idclase=' + that.subunits[subunit_index + 1].id + '&modo='+modoVisualizacion+ strPopup + slideNavParams,
										false, undefined);
								} else {
									blink.activity.showNextSection();
								}
							}
						});

						document.addEventListener('swipe:first:previousActivity', function(e) {
							blink.activity.previousSlide(that.subunits, subunit_index);
						}, false);
						document.addEventListener('swipe:last:nextActivity', function(e) {
							blink.activity.nextSlide(that.subunits, subunit_index);
						}, false);
					} else {
						$('.left.slider-control, .left.slider-navigator').click(function () {
							blink.activity.showPrevSection();
						});
						$('.right.slider-control, .right.slider-navigator').click(function () {
							blink.activity.showNextSection();
						});
					}

					$(document).ready(function() {
						blink.events.on('showSlide:after', function() {
							that.enableSliders();
						});
					});
				});
			}
		},

        animateNavbarOnScroll: function () {
            if (!blink.isApp) return;
            var $navbar = $('.Delta-navbar');
            var lastScrollTop = 0;
            $('.js-slider-item').scroll(function () {
                var scrollTop = $(this).scrollTop();
                (scrollTop > lastScrollTop && scrollTop) ? $navbar.addClass('ocultar') : $navbar.removeClass('ocultar');
                lastScrollTop = scrollTop;
            });
        },

        changeHighBar: function () {
			if($('.Delta-navbar').length>0 && $('.navbar').length>0 && !this.isModoRevision && !blink.isApp){
                blink.theme.setTopByHeight('.navbar', '.Delta-navbar');
            }
        },

        getDescription: function() {
        	var curso = blink.getCourse(idcurso);
            curso.done(function () {
	            var unit = _.findWhere(curso.responseJSON.units, {id: idtema.toString()}),
	            	title = unit.title,
	            	description = unit.description;
		        $('#cross').popover({title: title, content: description, placement: "bottom", trigger: "hover", html: true});
	        });
		},
        /**
         * @summary Enables all slider controls and disables when appropiate
         */
        enableSliders: function () {
            // Removes disabled class to all navigation buttons and applies
            // just if its first or last slide of all activities
            $('.slider-control, .slider-navigator').removeClass('disabled');

            // Navigation change depending on whether the slides are accessed from
            // a book or from a homework link or similar
            if (this.subunits.length !== 0) {
                if (this.getActualSlideNumber(this.subunits) == 1) {
                    $('.slider-control.left, .slider-navigator.left').addClass('disabled');
                }
                if (this.getActualSlideNumber(this.subunits) == this.totalSlides) {
                    $('.slider-control.right, .slider-navigator.right').addClass('disabled');
				}
            } else {
                if (window.activeSlide == 0) {
                    $('.slider-control.left, .slider-navigator.left').addClass('disabled');
                }
                if (window.activeSlide + 1 == window.secuencia.length) {
                    $('.slider-control.right, .slider-navigator.right').addClass('disabled');
                }
			}
        },
		/**
		 * @summary Gets the activity type subunits of the actual unit.
		 * @return {Object} Object of the actual unit filtering the not activity type subunits
		 */
		getActualUnitActivities: function () {
			var curso = blink.getCourse(idcurso),
				that = this,
				units,
				unitSubunits,
				actualActivity,
				unitActivities = [];

			curso.done(function () {
				units = curso.responseJSON.units;

				$.each(units, function () {
					if (this.id && this.id == blink.courseInfo.IDUnit) {
						unitSubunits = this.subunits.concat(this.resources);
					}
				});

				actualActivity = _.find(unitSubunits, function(subunit) {
					return subunit.id == idclase;
				});

				if (typeof actualActivity !== "undefined" && actualActivity.level == '6') {
					unitActivities.push(actualActivity);
				} else {
					unitActivities = _.filter(unitSubunits, function(subunit) {
						return subunit.type == 'actividad' && subunit.level !== '6';
					});
				}

				that.subunits = unitActivities;
			}).done(function(){
				blink.events.trigger('course_loaded');
			});
		},
		/**
		 * @summary Getting active slide position in relation with the total of the
		 *          unit slides.
		 * @param {Array} $subunits Array of activity type objects
		 * @return {int} Slide position
		 */
		getActualSlideNumber: function (subunits) {
			var actualSlideIndex = $('.swipeview-active').attr('data-page-index'),
				actualSlide = 1;

			for (var i in subunits) {
				if (subunits[i].id && parseInt(subunits[i].id) != idclase) {
					actualSlide += parseInt(subunits[i].pags);
				} else {
					actualSlide += parseInt(actualSlideIndex);
					break;
				}
			}

			return actualSlide;
		}
    };

    Delta_Style.prototype = _.extend({}, new blink.theme.styles.basic(), Delta_Style.prototype);

    blink.theme.styles['Delta'] = Delta_Style;

})( blink );

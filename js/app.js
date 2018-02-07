jQuery(document).foundation();

jQuery(function($){

	// Sélection de toutes les div sauf la première
	$('#recipes > div').not(':first').hide();

	// Ajout de la class active sur le 1er item par défaut au chargement de la page
	$('#filter .menu li:first-child').addClass('active');

	$('#filter .menu a').on('click', function(){
		
		// On enlève la classe active dès qu'on a cliqué puis on l'ajoute au li cliqué
		$('#filter .menu li').removeClass('active');
		$(this).parent().addClass('active');

		// On récupère le slug stocké dans a href
		var recipe_link = $(this).attr('href');

		// On cache la div qui contient le foreach qui boucle sur toutes les propositions
		$('#recipes > div').hide();

		// On montre l'ensemble quicorrespond au lien cliqué
		$(recipe_link).show();

		// Empèche le navigateur de suivre le lien quand on clique dessus
		return false;
	});


	// ********************************
	// RECUPER L'HEURE DE L'UTILISATEUR
	// ********************************

	var date = new Date();
	var time = date.getHours();
	var meal;

	if(time<=10){
		meal = "breakfast"
	} else if(time >= 11 && time <= 15){
		meal = "lunch"
	} else{
		meal = "dinner";
	}

	$('h2#time').append('<span>' + meal + '</span>');


	// ********************************
	// PROCESS AJAX
	// ********************************

	jQuery.ajax({
		url: admin_url.ajax_url,
		type: 'post',
		data: {
			action: 'recipe_'+meal
		}
	}).done(function(response){
		$.each(response, function(index, object){
			var recipe_meal = '<li class="medium-4 small-12 columns">' +
							   object.image +
							   '<div class="content">' +
							   '<h3 class="text-center">' +
							   '<a href="'+object.link +'">'+
							   object.name +
							   '</a>' +
							   '</h3>' +
							   '</div>' + 
							   '</li>';

			$('#meal-per-hour').append(recipe_meal);
		});
	});

});

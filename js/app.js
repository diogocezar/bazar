const App = {
	vue       : null,
	templates : {},
	configs   : {
		'vueEl' : '#dev-is-selling'
	},
	init : () => {
		App.constructTemplates();
		App.startComponents();
		App.startVue();
	},
	setFancybox: () => {
		$("[data-fancybox]").fancybox({
            infobar    : true,
            closeBtn   : true,
            slideShow  : false,
            fullScreen : false,
            thumbs     : false,
            touch      : true,
            hash       : false,
			buttons : [
				'close'
			]
        });
	},
	constructTemplates: () => {
		App.templates.product = [];
		App.templates.product.push('<div class="item well" v-bind:class="{selled : !product.active}">');
			App.templates.product.push('<h2>{{product.name}}</h2>');
			App.templates.product.push('<a data-fancybox="gallery" :data-options="formatFancy(product.name)" :href="product.image"><img class="product-image" :src="product.image"></a>');
			App.templates.product.push('<div class="description" v-for="desc in product.description">');
				App.templates.product.push('<div class="description" v-for="(value, key) in desc">');
					App.templates.product.push('<h1 v-if=\'key == "h1"\'>{{value}}</h1>');
					App.templates.product.push('<h2 v-if=\'key == "h2"\'>{{value}}</h2>');
					App.templates.product.push('<h3 v-if=\'key == "h3"\'>{{value}}</h3>');
					App.templates.product.push('<h4 v-if=\'key == "h4"\'>{{value}}</h4>');
					App.templates.product.push('<p v-if=\'key == "p"\'>{{value}}</p>');
				App.templates.product.push('</div>');
			App.templates.product.push('</div>');
			App.templates.product.push('<h2 class="price">{{ formatNumber(product.price) }}</h2>');
			App.templates.product.push('<a :href="\'mailto:\' + configs.email + \'?subject=\' + configs.subject + product.name + \'&body=\' + configs.body + product.name"><button>Comprar</button></a>');
		App.templates.product.push('</div>');
	},
	startComponents: () => {
		Vue.component('product-item', {
			props: ['product', 'configs'],
			template: App.templates.product.join(''),
			methods: {
				formatNumber: function (value) {
					return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
				},
				formatFancy: function (product){
					return '{"caption" : "' + product + '", "id" : "testeaaa"}';
				}
			}
		});
	},
	startVue: () => {
		App.vue = new Vue({
			el : App.configs.vueEl,
			data() {
				return {
					configs : [],
					products : []
				}
			},
			methods: {
			    getDatabase: function(){
			        axios.get('./json/database.json').
			            then(response => {
			                this.products = response.data.products;
			                this.configs  = response.data.configs;
			                App.vue.setTitlePage();
			            });
			    },
			    setTitlePage: function(){
			    	document.title = this.configs.title;
			    }
			},
			mounted(){
				this.getDatabase();
				setTimeout(function() {
        			App.setFancybox();
    			}, 500);
			}
		})
	}
};

App.init();
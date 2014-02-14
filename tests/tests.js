var assert = chai.assert;

suite('csv', function() {
    test('Entrada valida', function() {
        original.value = '"producto", "precio" \n "camisa", "4,3"';
	calculate();
        assert.equal(finaltable.innerHTML, '\n\t<table class="center">\n\t  \n\t    \n\t    \t<tbody><tr>\n            \n\t      <td>producto</td>\n\t    \n\t      <td>precio</td>\n\t    \n\t    </tr>\n\t  \n\t    \n\t    \t<tr>\n            \n\t      <td>camisa</td>\n\t    \n\t      <td>4,3</td>\n\t    \n\t    </tr>\n\t  \n\t</tbody></table>\n    ');
	assert.notMatch(finaltable.innerHTML, /class="error"/);
    });

    test('Entrada erronea', function() {
        original.value = '"producto", "precio" \n "camisa", "4,3", 44';
        calculate();
        assert.match(finaltable.innerHTML, /class="error"/);
    });

});
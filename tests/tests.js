var assert = chai.assert;

suite('csv', function() {
    test('Entrada valida', function() {
        original.value = '"producto", "precio" \n "camisa", "4,3"';
	calculate();
        assert.equal(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>producto</td>                                  <td>precio</td>              </tr>\n<tr>                    <td>camisa</td>                                  <td>4,3</td>              </tr>\n</tbody></table>');
	assert.notMatch(finaltable.innerHTML, /class="error"/);
    });

    test('Entrada erronea', function() {
        original.value = '"producto", "precio" \n "camisa", "4,3", 44';
        calculate();
        assert.match(finaltable.innerHTML, /class="error"/);
    });

});
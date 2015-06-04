function rg32(input) {
    var a = [];
    var b = [];
	
    function beltmill() {
        var ap, x, y, r, q, c, i;
        ap = [];
        q = [];

        for(c = 0; c < 3; c++) {
            q[c] = b[c * 13 + 12];
        }
        for(i = 12; i > 0; i--) {
            for(c = 0; c < 3; c++) {
                b[c * 13 + i] = b[c * 13 + i - 1];
            }
        }
        for(c = 0; c < 3; c++) {
            b[c * 13] = q[c];
        }
        for(c = 0; c < 12; c++) {
            i = c + 1 + ((c % 3) * 13);
            b[i] ^= a[c + 1];
        }
        for(c = 0; c < 19; c++) { // RG32 Mill
            y = (c * 7) % 19;
            r = (((c * c) + c) / 2) % 32;
            x = a[y] ^ (a[(y + 1) % 19] | 
					(a[(y + 2) % 19] ^ 0xffffffff));
            ap[c] = (x >>> r) | (x << (32 - r));
        }	
        for(c = 0; c < 19; c++) {
            a[c] = ap[c] ^ ap[(c + 1) % 19] ^ ap[(c + 4) % 19];
        }
        a[0] ^= 1;

        for(c = 0; c < 3; c++) {
            a[c+13]^=q[c];
        }

    }

    place = 1;
    function nextbyte() {
        var output = a[place];
        if(output < 0) {
            output += 0x100000000;
        }
        place++;
        if(place > 2) {
            place = 1;
            beltmill();
        }
        return output;
    }

    this.foo = input;

    // Method for returning 32-bit ints of the internal state of this
    // "masher"
    this.rng = function() {
        var endian;
        endian = nextbyte();
        endian = ((endian & 0xff000000) >>> 24) |
			 ((endian & 0x00ff0000) >>>  8) |
			 ((endian & 0x0000ff00) <<  8) |
			 ((endian & 0x000000ff) << 24);
        return endian;
    };

    // Constructor: Input map
    var s, q, c, r, x, d, v, place;
    s = [];
    v = 0;
    d = 0;

    for(c = 0; c < 19; c++) {
        a[c] = 0;
    }
    for(c = 0; c < 39; c++) {
        b[c] = 0;
    }
	
    for(v = 0;v <= input.length;) {
        for(c = 0 ; c < 3 ; c++) { // Blank input words 
            s[c] = 0;
        }
        for(r = 0; r < 3; r++) {
            for(q = 0; q < 4; q++) {
                if(v < input.length) {
                    x = input.charCodeAt(v);
                    v++;
                    s[r] |= x << (q * 8);
                } else {
                    s[r] |= 1 << (q * 8);
                    for(c = 0; c < 3; c++) {
                        b[c * 13] ^= s[c];
                        a[16 + c] ^= s[c];
                    }	
                    for(c = 0; c < 16; c++) {
                        beltmill();
                    }
                    beltmill();
                    beltmill();
                    return;
                }
            }
        }
        for(c = 0; c < 3; c++) {
            b[c * 13] ^= s[c];
            a[16 + c] ^= s[c];
        }	
        beltmill();
    }

    // 16 blank rounds
    for(c = 0; c < 16; c++) {
        beltmill();
    }

}	

function rg32_vector(input) {
    var hash = new rg32(input);
    var a = hexnumber(hash.rng());
    a = a + hexnumber(hash.rng());			
    a = a + hexnumber(hash.rng());			
    a = a + hexnumber(hash.rng());			
    a = a + hexnumber(hash.rng());			
    a = a + hexnumber(hash.rng());			
    a = a + hexnumber(hash.rng());			
    a = a + hexnumber(hash.rng());			
    return a;
}

function hexnumber(input) {
    var z = input;
    if(z < 0) {
        z += 0x100000000;
    }
    return z.toString(16);
}

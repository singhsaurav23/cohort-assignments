/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
    #res;
    constructor() {
        this.#res = 0;
    }
    add(n) {
        this.#res += n;
    }
    subtract(n) {
        this.#res -= n;
    }
    multiply(n) {
        this.#res *= n;
    }
    divide(n) {
        if (n == 0) throw new Exception("Error");
        this.#res /= n;
    }
    clear() {
        this.#res = 0;
    }
    getResult() {
        return this.#res;
    }
    apply(op, v1, v2) {
        if (op == '+') return v2 + v1;
        if (op == '-') return v2 - v1;
        if (op == '*') return v2 * v1;
        if (v1 == 0) throw new Exception("Error");
        if (op == '/') return v2 / v1;
    }
    hasPrecedence(op1, op2) {
        if (op2 == '(') return false;
        if ((op1 == '*' || op1 == '/') && (op2 == '+' || op2 == '-')) return false;
        return true;
    }
    calculate(str) {
        let ops = [];
        let values = [];
        for (let i = 0; i < str.length; i++) {
            if (str[i] == ' ') continue;
            if (str[i] == '(') {
                ops.push(str[i]);
            }
            else if (str[i] == ')') {
                while (ops.length > 0 && ops[ops.length - 1] != '(') {
                    values.push(this.apply(ops.pop(), values.pop(), values.pop()));

                }
                if (ops.length == 0) throw new Exception("Error");
                    ops.pop();
            }
            else if (str[i] == '+' || str[i] == '-' || str[i] == '*' || str[i] == '/') {
                while (ops.length >= 1 && this.hasPrecedence(str[i], ops[ops.length - 1])) {
                    values.push(this.apply(ops.pop(), values.pop(), values.pop()));
                }
                ops.push(str[i]);
            }
            else {
                if (str[i]!='.' && str[i] < '0' || str[i] > '9') throw new Exception("Error");
                let sbuf = "";
                let cnt = 0;
                while (i < str.length && str[i] >= '0' && str[i] <= '9' || str[i] == '.') {
                    if (str[i] == '.') cnt++;
                    sbuf = sbuf + str[i++];
                }
                if (cnt > 1) throw new Exception("Error");
                values.push(parseFloat(sbuf, 10));
                i--;
            }
        }
        while (ops.length > 0) {
            if (ops[ops.length - 1] == '(') throw new Exception("Error");
            values.push(this.apply(ops.pop(), values.pop(), values.pop()));
        }
        this.#res = values.pop();
        return this.#res;
    }
}

module.exports = Calculator;

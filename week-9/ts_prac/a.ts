abstract class Animal {
    abstract makeSound(): void;
    eat() {
        console.log("Eating");
    }
}

class Dog implments Animal {
    makeSound() {
        console.log("Barking");
    }
}

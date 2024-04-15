<?php

class Person {
  private $name;
  private $lastname;
  private $age;
  private $hp;
  private $mother;
  private $father;

  function __construct($name, $lastname, $age, $mother=null, $father=null)
  {
    $this->name = $name;
    $this->lastname = $lastname;
    $this->age = $age;
    $this->mother = $mother;
    $this->father = $father;
    $this->hp = 100;
  }

  function sayHi($name) {
    return "Hi $name, I'm " . $this->name;
  }

  function setHp($hp) {
    if($this->hp + $hp > 100) $this->hp = 100;
    else $this->hp = $this->hp + $hp;
  }
  function getHp() {
    return $this->hp;
  }
  function getName() {
    return $this->name;
  }
  function getMother() {
    return $this->mother;
  }
  function getFather() {
    return $this->father;
  }
  function getInfo() {
    return "
      <h2>Несколько слов о моих родственниках: </h2><br>" . "Меня зовут - " . $this->getName() . "<br> Моя фамилия - ";
  }
}

$igor = new Person("Igor", "Petrov", 68);



$alex = new Person("Alex", "Ivanov", 32);
$olga = new Person("Olga", "Ivanova", 30, null, $igor);
$andrey = new Person("Andrey", "Ivanov", 10, $olga, $alex);

echo $andrey->getMother()->getFather()->getName();




//Здоровье человека не может быть больше 100


// $alex->setHp(-30); //Упал

// $medKit = 50;

// echo $alex->getHp() . "<br>";

// $alex->setHp($medKit); //Нашел аптечку

// echo $alex->getHp();


// echo $alex->sayHi($igor->name);
// echo $alex->name;

// $alex = new Person();

// $alex->name = "Alex";
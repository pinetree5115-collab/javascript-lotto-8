class Lotto {
  #numbers; // '#'은 클래스 외부에서 직접 접근할 수 없는 '개인 정보'라는 뜻입니다.

  constructor(numbers) {
    this.#validate(numbers); // 생성될 때 바로 검사합니다.
    this.#numbers = numbers.sort((a, b) => a - b); // 오름차순 정렬
  }

  // 로또 번호가 올바른지 검사하는 '나만의 검사기'
  #validate(numbers) {
    // 1. 개수가 6개가 아니면 에러
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }

    // 2. 숫자가 아닌 값이 들어있으면 에러
    if (numbers.some((num) => isNaN(num))) {
      throw new Error("[ERROR] 로또 번호는 숫자여야 합니다.");
    }

    // 3. 중복된 숫자가 있으면 에러
    const set = new Set(numbers);
    if (set.size !== 6) {
      throw new Error("[ERROR] 로또 번호에 중복된 숫자가 있습니다.");
    }
  }

  // 외부(Controller 등)에서 번호를 보여달라고 할 때 쓰는 메서드
  getNumbers() {
    return this.#numbers;
  }

  // 당첨 번호와 비교해서 몇 개가 일치하는지 계산하는 로직을 여기에 넣으면 좋아요!
  countMatch(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }
}

export default Lotto;
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
    this.#numbers.sort((a, b) => a - b); // 9. 번호 정렬 (미리 해둠)
  }

  // 기존 #validate에 유효성 검사를 추가합니다.
  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    // 4. 유효성 검증: 1~45 범위 및 중복 검사
    if (numbers.some(number => number < 1 || number > 45)) {
      throw new Error("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
    if (new Set(numbers).size !== 6) {
      throw new Error("[ERROR] 로또 번호는 중복될 수 없습니다.");
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  // 10번 기능: 당첨 번호와의 일치 개수 및 보너스 번호 일치 여부 계산
  getMatchResult(winningLotto, bonusNumber) {
    const winningNumbers = winningLotto.getNumbers();

    // 일치 개수 계산
    const matchCount = this.#numbers.filter(number =>
      winningNumbers.includes(number)
    ).length;

    // 보너스 번호 일치 여부
    const bonusMatch = this.#numbers.includes(bonusNumber);

    return { matchCount, bonusMatch };
  }

  // ... (나중에 추가할예정)
}

export default Lotto;

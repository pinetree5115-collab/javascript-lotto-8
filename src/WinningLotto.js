import Lotto from "./Lotto.js";

class WinningLotto {
  constructor(winningNumbers, bonusNumber) {
    // winningNumbers는 이미 Lotto 클래스에서 유효성 검증을 거쳤다고 가정합니다.
    this.winningLotto = new Lotto(winningNumbers);
    this.bonusNumber = this.validateBonusNumber(bonusNumber);
  }

  // 6번 기능: 보너스 번호 유효성 검증 로직
  validateBonusNumber(number) {
    const num = parseInt(number, 10);

    if (isNaN(num)) {
      throw new Error("[ERROR] 보너스 번호는 숫자여야 합니다.");
    }
    // 1~45 범위 검증
    if (num < 1 || num > 45) {
      throw new Error("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
    // 당첨 번호와 중복 검증
    if (this.winningLotto.getNumbers().includes(num)) {
      throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    }

    return num;
  }

  // 당첨 기준 및 상금을 정의합니다.
  export const PRIZES = {
    FIRST: { count: 6, bonus: false, amount: 2000000000, label: '6개 일치 (2,000,000,000원)' },
    SECOND: { count: 5, bonus: true, amount: 30000000, label: '5개 일치, 보너스 볼 일치 (30,000,000원)' },
    THIRD: { count: 5, bonus: false, amount: 1500000, label: '5개 일치 (1,500,000원)' },
    FOURTH: { count: 4, bonus: false, amount: 50000, label: '4개 일치 (50,000원)' },
    FIFTH: { count: 3, bonus: false, amount: 5000, label: '3개 일치 (5,000원)' },
  };

class WinningLotto {
  // ... (constructor 및 validateBonusNumber는 그대로)

  // 11번 기능: 로또 번호와 비교하여 당첨 등수를 반환
  rank(lotto) {
    const { matchCount, bonusMatch } = lotto.getMatchResult(this.winningLotto, this.bonusNumber);

    // 1등부터 5등까지 순차적으로 조건 검사 (else 지양 원칙 적용)
    if (matchCount === 6) return PRIZES.FIRST;
    if (matchCount === 5 && bonusMatch) return PRIZES.SECOND;
    if (matchCount === 5) return PRIZES.THIRD;
    if (matchCount === 4) return PRIZES.FOURTH;
    if (matchCount === 3) return PRIZES.FIFTH;

    return null; // 낙첨
  }
}
}

export default WinningLotto;
import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
// PRIZES 상수를 사용하기 위해 WinningLotto에서 import해야 합니다.
import WinningLotto, { PRIZES } from "./WinningLotto.js";

const LOTTO_PRICE = 1000;

// 당첨 내역 초기화 및 출력 순서를 정의합니다. (파일 상단에 위치)
const INITIAL_STATS = {
  [PRIZES.FIFTH.label]: 0,
  [PRIZES.FOURTH.label]: 0,
  [PRIZES.THIRD.label]: 0,
  [PRIZES.SECOND.label]: 0,
  [PRIZES.FIRST.label]: 0,
};

// ✨ 클래스는 파일당 한 번만 정의됩니다.
class LottoGame {
  constructor() {
    this.lottos = [];
    this.purchaseAmount = 0;
  }

  // 1, 2번 기능: 구입 금액 입력 및 검증 로직 (반복 입력 처리 포함)
  // 3, 4번 기능: 당첨 번호 입력 및 검증 (반복 처리)
  async getWinningNumbers() {
    while (true) {
      try {
        const input = await Console.readLineAsync("\n당첨 번호를 입력해 주세요.\n");
        const numbers = input.split(',').map(n => parseInt(n.trim(), 10));

        // 4. 유효성 검증: Lotto 객체 생성 시 검증이 자동으로 실행됨
        return new Lotto(numbers);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  // 5, 6번 기능: 보너스 번호 입력 및 검증 (반복 처리)
  async getBonusNumber(winningLotto) {
    while (true) {
      try {
        const input = await Console.readLineAsync("\n보너스 번호를 입력해 주세요.\n");
        const number = parseInt(input.trim(), 10);

        // 6. 유효성 검증: WinningLotto 생성자를 통해 검증이 실행됨
        return new WinningLotto(winningLotto.getNumbers(), number);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  // 2번 기능: 금액 유효성 검증 로직
  validateAmount(input) {
    const amount = parseInt(input.trim(), 10);
    if (isNaN(amount)) {
      throw new Error("[ERROR] 구입 금액은 숫자여야 합니다.");
    }
    if (amount % LOTTO_PRICE !== 0 || amount === 0) {
      throw new Error("[ERROR] 구입 금액은 1,000원 단위로 입력해야 합니다.");
    }
    return amount;
  }

  // 7, 8, 9번 기능: 로또 발행 로직
  issueLottos() {
    const count = this.purchaseAmount / LOTTO_PRICE;
    Console.print(`\n${count}개를 구매했습니다.`);

    for (let i = 0; i < count; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      this.lottos.push(new Lotto(numbers));
      Console.print(`[${this.lottos[i].getNumbers().join(', ')}]`);
    }
  }

  // 12, 13번 기능: 당첨 통계 계산 및 출력
  calculateAndPrintResults(winningNumbers, bonusNumber) {
    // winningLotto 인스턴스 생성 시 유효성 검사가 WinningLotto 생성자에서 실행됩니다.
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

    const stats = this.lottos.reduce((acc, lotto) => {
      const rank = winningLotto.rank(lotto);
      if (rank) {
        acc[rank.label] += 1;
      }
      return acc;
    }, { ...INITIAL_STATS });

    this.printWinningStats(stats);
    this.printProfitRate(stats);
  }

  // 12번 기능: 당첨 내역 출력
  printWinningStats(stats) {
    Console.print('\n당첨 통계');
    Console.print('---');
    Object.keys(INITIAL_STATS).forEach(label => {
      Console.print(`${label} - ${stats[label]}개`);
    });
  }

  // 14번 기능: 수익률 계산 및 출력
  printProfitRate(stats) {
    let totalRevenue = 0;
    Object.keys(stats).forEach(label => {
      // PRIZES 상수는 WinningLotto에서 export 했으므로 여기에서 직접 접근 가능
      const prize = Object.values(PRIZES).find(p => p.label === label);
      if (prize) { // prize가 존재하는지 확인 (안전성 추가)
        totalRevenue += stats[label] * prize.amount;
      }
    });

    const profitRate = (totalRevenue / this.purchaseAmount) * 100;

    // 수익률 소수점 둘째 자리에서 반올림
    const roundedRate = Math.round(profitRate * 10) / 10;
    Console.print(`총 수익률은 ${roundedRate.toLocaleString('ko-KR')}%입니다.`);
  }
}

export default LottoGame; 
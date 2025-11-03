
import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import WinningLotto, { PRIZES } from "./WinningLotto.js";

const LOTTO_PRICE = 1000;

// 당첨 내역 초기화 및 출력 순서를 정의합니다.
const INITIAL_STATS = {
  [PRIZES.FIFTH.label]: 0,
  [PRIZES.FOURTH.label]: 0,
  [PRIZES.THIRD.label]: 0,
  [PRIZES.SECOND.label]: 0,
  [PRIZES.FIRST.label]: 0,
};

class LottoGame {
  constructor() {
    this.lottos = [];
    this.purchaseAmount = 0;
  }

  // 1, 2번 기능: 구입 금액 입력 및 검증 로직 (반복 입력 처리 포함)
  async getPurchaseAmount() {
    while (true) {
      try {
        const input = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
        const amount = this.validateAmount(input); // 검증 로직 호출
        this.purchaseAmount = amount;
        return; // 성공 시 반복문 탈출
      } catch (error) {
        Console.print(error.message); // 예외 상황 시 에러 출력 후 다시 입력받음
      }
    }
  }

  // 2번 기능: 금액 유효성 검증 로직
  validateAmount(input) {
    const amount = parseInt(input.trim(), 10);
    if (isNaN(amount)) {
      throw new Error("[ERROR] 구입 금액은 숫자여야 합니다.");
    }
    // 1000원 단위 검증
    if (amount % LOTTO_PRICE !== 0 || amount === 0) {
      throw new Error("[ERROR] 구입 금액은 1,000원 단위로 입력해야 합니다.");
    }
    return amount;
  }

  // 7, 8번 기능: 로또 발행 로직
  issueLottos() {
    const count = this.purchaseAmount / LOTTO_PRICE;
    Console.print(`\n${count}개를 구매했습니다.`); // 7. 발행 수량 출력

    for (let i = 0; i < count; i++) {
      // 8. Random.pickUniqueNumbersInRange를 사용하여 6개를 뽑는다.
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      this.lottos.push(new Lotto(numbers));

      // 9. 발행된 로또 번호를 오름차순으로 정렬하여 출력한다. (Lotto 클래스에서 정렬됨)
      Console.print(`[${this.lottos[i].getNumbers().join(', ')}]`);
    }
  }


class LottoGame {
  // ... (constructor, getPurchaseAmount, issueLottos는 그대로)

  // 12, 13번 기능: 당첨 통계 계산 및 출력
  calculateAndPrintResults(winningNumbers, bonusNumber) {
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const stats = this.lottos.reduce((acc, lotto) => {
      const rank = winningLotto.rank(lotto);
      if (rank) {
        acc[rank.label] += 1;
      }
      return acc;
    }, { ...INITIAL_STATS }); // 초기 통계 객체 복사

    this.printWinningStats(stats); // 당첨 내역 출력
    this.printProfitRate(stats);   // 수익률 출력
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
      const prize = Object.values(PRIZES).find(p => p.label === label);
      totalRevenue += stats[label] * prize.amount;
    });

    const profitRate = (totalRevenue / this.purchaseAmount) * 100;

    // 수익률 소수점 둘째 자리에서 반올림
    const roundedRate = Math.round(profitRate * 10) / 10;
    Console.print(`총 수익률은 ${roundedRate.toLocaleString('ko-KR')}%입니다.`);
  }

  // ... (나머지 로직은 그대로)
}
}

export default LottoGame;
// src/LottoGame.js

import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

const LOTTO_PRICE = 1000;

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

  // ...
}

export default LottoGame;
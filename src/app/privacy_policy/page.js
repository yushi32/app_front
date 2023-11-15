import Link from "next/link";

export default function Page() {
  return (
    <div className="flex-grow max-w-5xl mx-auto pt-12 pb-16 space-y-14 text-neutral-700">
      <div className="border-b-2">
        <h1 className="text-xl font-semibold">プライバシーポリシー</h1>
        <p className="py-4 text-sm">
          Laterless（以下、「当方」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-semibold">
          お客様から取得する情報
        </h2>
        <div className="space-y-4 text-sm">
          <p>
            当方は、お客様から以下の情報を取得します。
          </p>
          <ul className="space-y-2">
            <li>
              ・氏名(ニックネームやペンネームも含む)
            </li>
            <li>
              ・メールアドレス
            </li>
            <li>
              ・プロフィール画像
            </li>
            <li>
                ・外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
            </li>
            <li>
                ・本サービスの滞在時間、入力履歴、購買履歴等の本サービスにおけるお客様の行動履歴
            </li>
            <li>
                ・本サービスの起動時間、入力履歴、購買履歴等の本サービスの利用履歴
            </li>
            <li>
                ・その他当方が定める入力フォームにお客様が入力する情報
            </li>
            <li>
                ・その他当方が定める連携したChrome拡張機能からお客様が登録したページの情報
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-semibold">
          お客様の情報を利用する目的
        </h2>
        <div className="space-y-4 text-sm">
          <p>
            当方は、お客様から取得した情報を、以下の目的のために利用します。
          </p>
          <ul className="space-y-2">
            <li>
              ・本サービスに関する登録の受付、お客様の本人確認、認証のため
            </li>
            <li>
              ・お客様の本サービスの利用履歴を管理するため
            </li>
            <li>
              ・本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため
            </li>
            <li>
              ・本サービスに関するご案内をするため
            </li>
            <li>
              ・お客様からのお問い合わせに対応するため
            </li>
            <li>
              ・当方の規約や法令に違反する行為に対応するため
            </li>
            <li>
              ・本サービスの変更、提供中止、終了、契約解除をご連絡するため
            </li>
            <li>
              ・当方規約の変更等を通知するため
            </li>
            <li>
              ・以上の他、本サービスの提供、維持、保護及び改善のため
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-semibold">
          安全管理のために講じた措置
        </h2>
        <p className="text-sm">
          当方が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-semibold">
          第三者提供
        </h2>
        <div className="mt-2 space-y-4 text-sm">
          <p>
            当方は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものについては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
            但し、次の場合は除きます。
          </p>
          <ul className="space-y-2">
            <li>
              ・個人データの取扱いを外部に委託する場合
            </li>
            <li>
              ・当方や本サービスが買収された場合
            </li>
            <li>
              ・事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
            </li>
            <li>
              ・その他、法律によって合法的に第三者提供が許されている場合
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-semibold">
          プライバシーポリシーの変更
        </h2>
        <p className="text-sm">
          当方は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-semibold">
          お問い合わせ
        </h2>
        <div className="text-sm space-y-4">
          <p>
            お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のTwitterアカウントにご連絡ください。
            Twitterアカウント：
          </p>
          <p>
            <Link 
              href="https://twitter.com/yushi_en"
              className="text-emerald-500 hover:text-emerald-300"
            >
              https://twitter.com/yushi_en
            </Link>
          </p>
          <p>
            この場合、必ず、運転免許証のご提示等当方が指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。
          </p>
        </div>
      </div>
      <p className="text-sm">
        2023年11月16日 制定
      </p>
    </div>
  );
}
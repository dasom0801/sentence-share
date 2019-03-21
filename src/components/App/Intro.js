import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG} from '@fortawesome/free-brands-svg-icons';
import '../../styles/components/Intro.scss';

const Intro = ({ loginWithFirebase }) => {
  const introSentence = [
    {
      sentence: '난 진정 내 안에서 솟아 나오려는 것. 그것을 살아 보려 했다. 왜 그것이 그토록 어려웠을까.',
      from: '데미안'
    },
    { 
      sentence: '자신과의 싸움보다 자신과 잘 지내는 게 훨씬 더 중요하다.',
      from: '언어의 온도'
    },
    {
      sentence: '‘내‘가 바뀌면 ‘세계‘가 바뀐다. 세계란 다른 누군가가 바꿔주는 것이 아니라, 오로지 ‘나‘의 힘으로만 바뀔수 있다는 뜻이지.',
      from: '미움받을 용기'
    },
    {
      sentence: '모든 사람은 항상 다른 누군가로 변해 간다.',
      from: '아리스토텔레스와 단테, 우주의 비밀을 발견하다'
    },
    {
      sentence: '복작했던 시간을 뒤로하고 우리의 시간을 곱씹으며 되돌아가는 길이 있다는 것은 언제나 나를 안심시킨다.',
      from: '별일 아닌 것들로 별일이 됐던 어느 밤'
    }
  ]

  return (
    <div className="intro">
      <ul className="intro-slide">
        {introSentence.map((item, index) => {
          return (
            <li key={index} className="slide-item">
              <p className="sentence">{item.sentence}</p>
              <p className="sentence from">{`- ${item.from} -`}</p> 
            </li>
          )
        })}
      </ul>
      <div className="btn-login">
        <button onClick={() => { loginWithFirebase() }}>
          <FontAwesomeIcon className="google-icon" icon={faGooglePlusG} />
          Google로 시작하기
        </button>
      </div>
      <p className="desktop-alert">Sentece Share는 모바일에 최적화되어있습니다.</p>
    </div>
    );
}
 
export default Intro;

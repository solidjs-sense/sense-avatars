import { createSignal } from 'solid-js';
import { nanoid } from 'nanoid';
import { generatorAvator } from '../../../src';
import { t } from '../util';
import './home.scss';

export default () => {
  const [url, setUrl] = createSignal(
    generatorAvator({
      name: `${nanoid()}`,
      fg: 'skyblue',
    }),
  );

  return (
    <div class="home-ctn">
      <div class="content">
        <div class="desc">{t('refresh')}</div>
        <img
          src={url()}
          onclick={() =>
            setUrl(
              generatorAvator({
                name: `${Math.random()}`,
                fg: 'skyblue',
              }),
            )
          }
        />
      </div>
    </div>
  );
};

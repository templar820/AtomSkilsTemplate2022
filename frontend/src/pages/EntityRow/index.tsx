import React from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';

function EntityRow(props) {
  return (
    <PageCard>
      <header className="d-flex flex-row justify-content-between align-items-center">
        <FilterRow
          filterNames={store.filterNames}
          onChange={order => store.setFilterNames(order)}
        />
        {!!store.botList.length && <span className="btn" onClick={createBot} style={{ color: Colors.linkColor }}>Добавить бота</span>}
      </header>
      <main>
        {store.botList.length
          ? store.botList.map((el, index) => (
            <BotCard key={index} bot={el} />
          ))
          : (
            <div className="container d-flex flex-column justify-content-center align-items-center">
              <div className="btn d-flex flex-column justify-content-center align-items-center" onClick={createBot}>
                <ChatIcon style={{ fontSize: '80px', color: Colors.linkColor }} />
                <span style={{ color: Colors.linkColor }}>Добавить бота</span>
              </div>
            </div>
          )}
      </main>
    </PageCard>
  );
}
export default MobXRouterDecorator(EntityRow);

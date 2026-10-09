// English content is stored as pages so translated records do not duplicate
// Chinese posts in Hexo's built-in archives and taxonomy generators.
hexo.extend.helper.register('site_locale', function () {
  return this.page.lang === 'en' ? 'en' : 'zh-CN';
});
hexo.extend.helper.register('site_text', function (key) {
  const language = this.page.lang === 'en' ? 'en' : 'zh-CN';
  const dictionary = this.site.data.ui[language];
  if (!(key in dictionary)) throw new Error('Missing site translation: ' + language + '/' + key);
  return dictionary[key];
});
hexo.extend.helper.register('site_home', function () {
  return this.url_for(this.page.lang === 'en' ? 'en/' : '');
});
hexo.extend.helper.register('site_is_home', function () {
  return this.is_home() || this.page.layout === 'profile-homepage';
});
hexo.extend.helper.register('site_path', function (path) {
  return this.url_for((this.page.lang === 'en' ? 'en/' : '') + path);
});
hexo.extend.helper.register('site_records', function (collections) {
  const records = this.page.lang === 'en' ? this.site.pages : this.site.posts;
  return records.filter(record => collections.includes(record.collection)).sort('date', -1);
});
hexo.extend.helper.register('site_group', function (id) {
  const group = this.site.data.collections.groups.find(item => item.id === id);
  return group ? (this.page.lang === 'en' ? group.label_en : group.label) : this.site_text('personalRecord');
});
hexo.extend.helper.register('site_topic', function (paper) {
  if (!paper) return this.site_text('other');
  const topic = this.site.data.paperread.topics.find(item => item.id === paper.topic_id);
  return topic ? (this.page.lang === 'en' ? topic.label_en : topic.label) : paper.topic || this.site_text('other');
});
hexo.extend.helper.register('site_alternate', function () {
  if (this.page.translation_path) return this.url_for(this.page.translation_path);
  const path = (this.page.path || '').replace(/index\.html$/, '');
  if (this.page.lang === 'en') return this.url_for(path.replace(/^en\//, ''));
  if (path.startsWith('archives/') || path.startsWith('categories/') || path.startsWith('tags/')) return this.url_for('en/archives/');
  return this.url_for('en/' + path);
});

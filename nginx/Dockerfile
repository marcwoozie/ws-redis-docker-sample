FROM nginx:1.13.3
# インクルード用のディレクトリ内を削除
RUN rm -f /etc/nginx/conf.d/*

# Nginxの設定ファイルをコンテナにコピー
ADD ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

RUN apt-get update -qq && apt-get install -y vim
# ビルド完了後にNginxを起動
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
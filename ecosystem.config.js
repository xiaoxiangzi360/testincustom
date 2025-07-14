module.exports = {
    apps: [
        {
            name: 'nuxt3-app',
            exec_mode: 'cluster',
            instances: 'max', // 可改为 1 如果不需要多进程
            script: '.output/server/index.mjs',
            args: '',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};

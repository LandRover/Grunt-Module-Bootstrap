module.exports = {
    release: {
        expand: true,
        src: ['vendors/require/*'],
        dest: '<%= build.release %>/',
        filter: 'isFile'
    }
};
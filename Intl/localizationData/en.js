export default {
  locale: 'en',
  messages: {
    siteTitle: 'Task Manager',
    addPost: 'Add Post',
    addTask: 'Add Task',
    switchLanguage: 'Switch Language',
    twitterMessage: 'We are on Twitter',
    by: 'By',
    deletePost: 'Delete Post',
    deleteTask: 'Delete Task',
    createNewPost: 'Create new post',
    createNewTask: 'Create new task',
    authorName: 'Author\'s Name',
    postTitle: 'Post Title',
    postContent: 'Post Content',
    taskContent: 'Task Content',
    submit: 'Submit',
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	}`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	}`,
    nestedDateComment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} as of {date}`,
  },
};
